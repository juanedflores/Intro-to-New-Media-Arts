PANDOCFLAGSHTML =                                           \
  --table-of-contents                                       \
  --section-divs                                            \
  --toc-depth=4                                             \
  --from=markdown+markdown_in_html_blocks+bracketed_spans+fenced_code_attributes   \
  --template=../../pandoc/blog_template.html

# a wildcard that searches recursively
rwildcard = $(wildcard $1$2) $(foreach d,$(wildcard $1*),$(call rwildcard,$d/,$2))

# find all markdown files
MARKDOWN := $(call rwildcard,./,*.md)
HTML = $(MARKDOWN:.md=.html)

all: $(HTML)

# Every post always gets the plain page. If its frontmatter has a `video:`
# field (a YouTube link), we also build a "_video" sibling with the video +
# synced-transcript (HyperaudioLite) panel, using the split template. The
# transcript is transcript.html sitting right next to that post's .md file.
%.html: %.md
	@echo $@
	pandoc $< -o $@ $(PANDOCFLAGSHTML) -V basename=$(notdir $*)
	@vid=$$(python3 ../../pandoc/youtube_id.py $<); \
	if [ -n "$$vid" ]; then \
		video_out="$(dir $@)$(notdir $*)_video.html"; \
		echo "  -> $$video_out"; \
		pandoc $< -o "$$video_out" $(PANDOCFLAGSHTML:blog_template.html=blog_template_split.html) -V basename=$(notdir $*) -V video-id=$$vid; \
		transcript="$(dir $<)transcript.html"; \
		if [ -f "$$transcript" ]; then \
			python3 ../../pandoc/insertHTML.py "$$video_out" "$$transcript" "$$video_out"; \
		fi \
	fi

clean:
	rm $(HTML)
