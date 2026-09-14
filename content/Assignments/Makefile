PANDOCFLAGSHTML =                                           \
  --table-of-contents                                       \
  --section-divs                                            \
  --toc-depth=4                                             \
  --from=markdown+markdown_in_html_blocks+bracketed_spans+fenced_code_attributes   \
  --template=../../pandoc/blog_template.html                                      \
  --lua-filter=../../pandoc/week_shortcodes.lua

# a wildcard that searches recursively
rwildcard = $(wildcard $1$2) $(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2))

# find all markdown files, excluding vendored library content (e.g. the
# reveal.js copy under Creative_Interfaces_Slides, which has its own build
# and ships its own README.md files that aren't meant for this pipeline).
# Note: filter-out's % pattern only supports a single wildcard, so a
# substring exclusion like this has to go through findstring instead.
ALL_MARKDOWN := $(call rwildcard,./,*.md)
MARKDOWN := $(foreach f,$(ALL_MARKDOWN),$(if $(findstring /Creative_Interfaces_Slides/,$(f)),,$(f)))
HTML = $(MARKDOWN:.md=.html)

all: $(HTML)

%.html: %.md
	@echo $@
	pandoc $< -o $@ $(PANDOCFLAGSHTML)

clean:
	rm $(HTML)
