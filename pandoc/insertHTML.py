from bs4 import BeautifulSoup
import sys

soup = BeautifulSoup(open(sys.argv[1], "r"))

# Find the target div
target_div = soup.find(id="target-div")

target_div.clear()
new_tag = soup.new_tag("p")
new_tag.string = "This new content was set offline."
target_div.append(new_tag)

# Print or save the modified HTML
print(soup.prettify())
