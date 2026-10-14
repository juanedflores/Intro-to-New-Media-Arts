---
title: constrain() function
---

# constrain()

## What it does

`constrain()` keeps a number **inside a range**. If the number is too small, you get the lowest value of the range. If it's too big, you get the highest. If it's already inside, it doesn't change.

## Why we need it

[`map()`](../map/map.html) converts a number from one range to another, but it **doesn't keep the result inside** the new range. If the number you give it is outside the range you told it about, the result ends up outside too.

Say our photocell reads **100** when it's covered and **800** in normal light, so we write:

```arduino
int brightness = map(lightValue, 100, 800, 0, 255);
```

That works until the light goes past those numbers:

| Light reading | map() gives | After constrain(…, 0, 255) |
|---|---|---|
| 450 (in between) | 127 | 127 (no change) |
| 900 (someone turns on a lamp) | **291** | **255** |
| 50 (very dark) | **-18** | **0** |

`analogWrite()` only takes values from **0 to 255**, so 291 and -18 aren't valid brightnesses. `constrain()` fixes them.

## Parameters

```arduino
constrain(x, a, b)
```

- `x`: the number to keep inside the range
- `a`: the lowest it's allowed to be
- `b`: the highest it's allowed to be

It returns:

- `x`, if `x` is between `a` and `b`
- `a`, if `x` is less than `a`
- `b`, if `x` is greater than `b`

You'll usually see it right after `map()`, keeping the result inside the same range you mapped to:

```arduino
int brightness = map(lightValue, darkest, brightest, 0, 255);
brightness = constrain(brightness, 0, 255);
```

## See It in the Serial Plotter

This sketch prints two numbers: what `map()` gives, and what `constrain()` turns it into. Wire your photocell to **A0** (3.3V → photocell → A0, and a 10kΩ resistor from A0 to GND), upload, and open the **Serial Plotter**.

```arduino
int sensorPin = A0;

// a small range on purpose, so it's easy to go past both ends
int darkest = 300;
int brightest = 600;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int lightValue = analogRead(sensorPin);

  int mapped = map(lightValue, darkest, brightest, 0, 255);
  int constrained = constrain(mapped, 0, 255);

  // two numbers on one line: the Serial Plotter draws two lines
  Serial.print(mapped);
  Serial.print(" ");
  Serial.println(constrained);

  delay(20);
}
```

Cover the sensor and shine a light on it. One line goes past 0 and 255; the other one stops flat at 0 and 255. That flat line is `constrain()` at work.

<blockquote class="info">
<span class="uk-label uk-label-warning">Info</span>
<p>Check out the official Arduino documentation for the constrain() function:</p>
<a href="https://docs.arduino.cc/language-reference/en/functions/math/constrain/">constrain()</a>
</blockquote>
