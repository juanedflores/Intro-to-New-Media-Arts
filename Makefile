PANDOCFLAGSHTML =                                           \
  --table-of-contents                                       \
  --mathjax                                                 \
  --standalone                                              \
  --toc-depth=4                                             \
  --from=markdown+markdown_in_html_blocks                   \
  --template=./pandoc/blog_template.html

# a wildcard that searches recursively
rwildcard = $(wildcard $1$2) $(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2))

# find all markdown files
MARKDOWN := $(call rwildcard,./pages/,*.md)
HTML = $(MARKDOWN:.md=.html)

all: $(HTML)

%.html: %.md
	@echo $@
	pandoc $< -o $@ -F "mermaid-filter" $(PANDOCFLAGSHTML)

clean:
	rm $(HTML)
