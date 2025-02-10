PANDOCFLAGSHTML =                                           \
  --table-of-contents                                       \
  --mathjax                                                 \
  --top-level-division=part                                 \
  --from=markdown+markdown_in_html_blocks                   \
  # --template=./pandoc/blog_template.html                    \

# a wildcard that searches recursively
rwildcard = $(wildcard $1$2) $(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2))

# find all markdown files
MARKDOWN := $(call rwildcard,./pages/,*.md)
HTML = $(MARKDOWN:.md=.html)

all: $(HTML)

%.html: %.md
	@echo $@
	pando --section-divs --number-sections $< -o $@ -F "mermaid-filter" -t html5 $(PANDOCFLAGSHTML)

clean:
	rm $(HTML)
