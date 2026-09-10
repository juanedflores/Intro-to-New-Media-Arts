PANDOCFLAGSHTML =                                           \
  --table-of-contents                                       \
  --section-divs                                            \
  --toc-depth=4                                             \
  --from=markdown+markdown_in_html_blocks+bracketed_spans+fenced_code_attributes   \
  --template=../../pandoc/mainpage_template.html                                  \
  --lua-filter=../../pandoc/week_shortcodes.lua

# a wildcard that searches recursively
rwildcard = $(wildcard $1$2) $(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2))

# find all markdown files
MARKDOWN := $(call rwildcard,./,*.md)
HTML = $(MARKDOWN:.md=.html)

all: $(HTML)

%.html: %.md
	@echo $@
	pandoc $< -o $@ $(PANDOCFLAGSHTML)

clean:
	rm $(HTML)
