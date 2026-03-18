PANDOCFLAGSHTML =                                           \
  --table-of-contents                                       \
  --section-divs                                            \
  --toc-depth=4                                             \
  --from=markdown+markdown_in_html_blocks+bracketed_spans+fenced_code_attributes  \
  --template=../pandoc/blog_template_split.html


# a wildcard that searches recursively
rwildcard = $(wildcard $1$2) $(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2))

# find all markdown files
MARKDOWN := $(call rwildcard,./,*.md)
HTML = $(MARKDOWN:.md=.html)

all: $(HTML)

%.html: %.md
	@echo $@ | cut -d'/' -f1
	pandoc $< -o $@ $(PANDOCFLAGSHTML)
	python3 ../pandoc/insertHTML.py $@ "./$(shell echo $@ | cut -d'/' -f1)/transcript.html" $@
# python3 ../pandoc/insertHTML.py ./Keyboard/transcript.html $@ 

clean:
	rm $(HTML)
