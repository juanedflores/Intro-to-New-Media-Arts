#!/usr/bin/env python3
"""Sensor Grid relay (ART 150, DIY Pressure Sensor Workshop).

Run this on the teacher's laptop while it is on the stations' Wi-Fi network:

    python3 relay.py        (or double-click start_sensor_grid.command)
    python3 relay.py --no-browser    (don't open the page automatically)

It does three things, using only Python's standard library:
  1. listens for the stations' Wi-Fi broadcasts (UDP port 9000), lines like
     "S1,412,0,873,15,600";
  2. serves the Sensor Grid page at http://localhost:8000 (no internet
     needed) and opens it in the browser;
  3. streams every line to the page as it arrives (/events).

Stop it with Ctrl+C.
"""

import json
import queue
import re
import socket
import sys
import threading
import time
import webbrowser
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

UDP_PORT = 9000
BEACON_PORT = 9001  # stations listen here to learn this laptop's address
HTTP_PORTS = range(8000, 8011)  # first free one wins
LINE = re.compile(r"^S([1-4]),[0-9,]+$")
SIGNAL = re.compile(r"^R([1-4]),(-?[0-9]+)$")  # station's Wi-Fi strength, dBm
WEAK = -75  # below this, readings start getting lost

HERE = Path(__file__).resolve().parent
# Serve the whole course site when this file sits inside it, so the page's
# fonts load; otherwise just this folder.
SITE = HERE.parents[3] if (HERE.parents[3] / "fonts").exists() else HERE
PAGE = "/" + str((HERE / "index.html").relative_to(SITE)).replace("\\", "/")

clients = set()
clients_lock = threading.Lock()
stations = {}  # station number -> {"ip": ..., "last": time}
quiet = set()  # stations that stopped sending
signals = {}  # station number -> last reported dBm


def local_ip():
    """This laptop's address on the current network (works offline)."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("10.255.255.255", 1))
        return s.getsockname()[0]
    except OSError:
        return "unknown"
    finally:
        s.close()


def listen_udp():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    if hasattr(socket, "SO_REUSEPORT"):
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)
    sock.bind(("", UDP_PORT))
    while True:
        data, (ip, _) = sock.recvfrom(256)
        line = data.decode("ascii", "ignore").strip()
        sig = SIGNAL.match(line)
        if sig:
            report_signal(int(sig.group(1)), int(sig.group(2)))
            continue
        m = LINE.match(line)
        if not m:
            continue
        n = int(m.group(1))
        known = stations.get(n)
        if known is None or known["ip"] != ip:
            print(f"  Station {n} connected ({ip})", flush=True)
        elif n in quiet:
            print(f"  Station {n} is back", flush=True)
        quiet.discard(n)
        stations[n] = {"ip": ip, "last": time.time()}
        with clients_lock:
            for q in list(clients):
                if q.full():
                    try:
                        q.get_nowait()  # drop the oldest; keep up with live data
                    except queue.Empty:
                        pass
                q.put_nowait(line)


def report_signal(n, dbm):
    """Print a station's signal the first time, and whenever it turns weak
    or recovers, so a badly placed station is easy to spot."""
    before = signals.get(n)
    signals[n] = dbm
    if before is None:
        note = "  (weak: move it closer to the router)" if dbm < WEAK else ""
        print(f"  Station {n} signal: {dbm} dBm{note}", flush=True)
    elif dbm < WEAK <= before:
        print(f"  Station {n} signal is weak ({dbm} dBm): move it closer to the router", flush=True)
    elif before < WEAK <= dbm:
        print(f"  Station {n} signal is fine again ({dbm} dBm)", flush=True)


def announce():
    """Tell the stations where this laptop is, once a second. They then send
    straight here, which arrives more smoothly than network-wide broadcasts."""
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
    while True:
        targets = {"255.255.255.255"}
        ip = local_ip()
        if ip.count(".") == 3:
            targets.add(ip.rsplit(".", 1)[0] + ".255")  # e.g. 10.0.0.255
        for t in targets:
            try:
                sock.sendto(b"RELAY", (t, BEACON_PORT))
            except OSError:
                pass  # no network yet; try again in a second
        time.sleep(1)


def watch_stations():
    """Mention stations that go quiet (unplugged, battery out, Wi-Fi lost)."""
    while True:
        now = time.time()
        for n, s in list(stations.items()):
            if now - s["last"] > 3 and n not in quiet:
                print(f"  Station {n} went quiet", flush=True)
                quiet.add(n)  # listen_udp() clears it when lines resume
        time.sleep(1)


class QuietServer(ThreadingHTTPServer):
    daemon_threads = True

    def handle_error(self, request, client_address):
        # a browser tab closing mid-request is normal; don't print a traceback
        if isinstance(sys.exc_info()[1], (ConnectionError, TimeoutError)):
            return
        super().handle_error(request, client_address)


class Handler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):  # keep the terminal readable
        pass

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_GET(self):
        if self.path in ("/", "/index.html"):
            self.send_response(302)
            self.send_header("Location", PAGE)
            self.end_headers()
        elif self.path == "/relay-info":
            body = json.dumps({"relay": True, "stations": sorted(stations)}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        elif self.path == "/events":
            self.stream()
        else:
            super().do_GET()

    def stream(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/event-stream")
        self.send_header("Connection", "keep-alive")
        self.end_headers()
        q = queue.Queue(maxsize=400)
        with clients_lock:
            clients.add(q)
        try:
            while True:
                try:
                    line = q.get(timeout=10)
                    self.wfile.write(f"data: {line}\n\n".encode())
                except queue.Empty:
                    self.wfile.write(b": ping\n\n")  # keeps the connection open
                self.wfile.flush()
        except (BrokenPipeError, ConnectionResetError, OSError):
            pass
        finally:
            with clients_lock:
                clients.discard(q)


def main():
    try:
        threading.Thread(target=listen_udp, daemon=True).start()
    except OSError as e:
        sys.exit(f"Could not listen on UDP port {UDP_PORT}: {e}")
    threading.Thread(target=watch_stations, daemon=True).start()
    threading.Thread(target=announce, daemon=True).start()

    server = None
    for port in HTTP_PORTS:
        try:
            server = QuietServer(("", port), partial(Handler, directory=str(SITE)))
            break
        except OSError:
            continue
    if server is None:
        sys.exit("Ports 8000-8010 are all busy. Close other servers and try again.")

    url = f"http://localhost:{server.server_address[1]}{PAGE}"
    print()
    print("  Sensor Grid relay is running")
    print(f"  Page:        {url}")
    print(f"  This laptop: {local_ip()} (stations broadcast to UDP port {UDP_PORT})")
    print("  Waiting for stations... (Ctrl+C to stop)")
    print()
    if "--no-browser" not in sys.argv:
        threading.Timer(1.0, webbrowser.open, args=(url,)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n  Stopped.")


if __name__ == "__main__":
    main()
