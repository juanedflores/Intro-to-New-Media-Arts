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
# synced-transcript (HyperaudioLite) panel, using the split template.
#
# The transcript is transcript.html sitting right next to that post's .md
# file. To create it, just drop a .vtt/.srt caption file (e.g. downloaded
# from YouTube Studio -> Subtitles -> Download) in the same directory - it
# gets auto-converted into transcript.html the next time this runs. Once
# transcript.html exists it's yours: it's only regenerated from the caption
# file if that file is newer, so hand edits to transcript.html are safe
# unless you drop in an updated caption file.
%.html: %.md
	@echo $@
	pandoc $< -o $@ $(PANDOCFLAGSHTML) -V basename=$(notdir $*)
	@vid=$$(python3 ../../pandoc/youtube_id.py $<); \
	if [ -n "$$vid" ]; then \
		video_out="$(dir $@)$(notdir $*)_video.html"; \
		transcript="$(dir $<)transcript.html"; \
		captions=$$(ls "$(dir $<)"*.vtt "$(dir $<)"*.srt 2>/dev/null | head -1); \
		if [ -n "$$captions" ] && { [ ! -f "$$transcript" ] || [ "$$captions" -nt "$$transcript" ]; }; then \
			echo "  -> $$transcript (from $$captions)"; \
			python3 ../../pandoc/transcript_from_youtube.py --captions "$$captions" -o "$$transcript"; \
		fi; \
		echo "  -> $$video_out"; \
		pandoc $< -o "$$video_out" $(PANDOCFLAGSHTML:blog_template.html=blog_template_split.html) -V basename=$(notdir $*) -V video-id=$$vid; \
		if [ -f "$$transcript" ]; then \
			python3 ../../pandoc/insertHTML.py "$$video_out" "$$transcript" "$$video_out"; \
		fi \
	fi

clean:
	rm $(HTML)
