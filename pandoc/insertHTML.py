from bs4 import BeautifulSoup
import sys

template_soup = BeautifulSoup(open(sys.argv[1], "r"))
transcript_soup = BeautifulSoup(open(sys.argv[2], "r"))

# Find the target div
target_div = template_soup.find(id="hypertranscript")
target_div.clear()
target_div.append(transcript_soup)

with open(sys.argv[3], "w", encoding="utf-8") as file:
    file.write(str(template_soup))
