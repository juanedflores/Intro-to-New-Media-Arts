-- Shortcodes for authoring week pages with less repetitive HTML.
-- Enables:
--   ::: {.days} ... :::                                  accordion wrapper (one per week)
--   ::: {.day title="MONDAY" open="true"} ... :::         one collapsible day
--   ::: {.announcement type="reminder|materials|tip|gallery"} ... :::  styled callout
--   ::: {.topics} ... :::                                 card grid wrapper
--   ::: {.card type="lesson|external|video|assignment|workshop" title="..." thumb="..." href="..." tag="..."} :::
--       optional fit="contain" shows the whole thumbnail (for diagrams) instead of cropping it
--   ::: {.nextweek} ... :::                               "looking ahead" callout

-- accent: the card's top strip; label_bg / label_fg: the tag on the image.
-- Syllabus palette (see css/site.css): red for things you make or hand in,
-- blue for reading and references, yellow for videos.
local card_styles = {
  lesson = { accent = '#2f64b7', label_bg = '#2f64b7', label_fg = '#ffffff', tag = 'Lesson' },
  external = { accent = '#2f64b7', label_bg = '#2f64b7', label_fg = '#ffffff', tag = 'External' },
  video = { accent = '#fbc740', label_bg = '#fbc740', label_fg = '#1d2433', tag = 'Video' },
  assignment = { accent = '#d53f32', label_bg = '#d53f32', label_fg = '#ffffff', tag = 'Assignment' },
  workshop = { accent = '#d53f32', label_bg = '#d53f32', label_fg = '#ffffff', tag = 'Workshop' },
}

local section_divs_opts = pandoc.WriterOptions({ ['section_divs'] = true })

local function inner_html(el)
  return pandoc.write(pandoc.Pandoc(el.content), 'html', section_divs_opts)
end

local function render_card(el)
  local a = el.attributes
  local style = card_styles[a.type] or card_styles.lesson

  -- tags: comma-separated list, e.g. tags="Blog,Output". Falls back to
  -- a single tag= attribute, then to the type's default tag.
  local tag_list = a.tags or a.tag or style.tag
  local labels = {}
  for t in tag_list:gmatch('[^,]+') do
    table.insert(labels, '<span class="topic-tag">' .. t:match('^%s*(.-)%s*$') .. '</span>')
  end

  local target_attr = (a.target and (' target="' .. a.target .. '"')) or ''
  local fit = (a.fit == 'contain') and ' topic-thumb-contain' or ''

  return pandoc.RawBlock(
    'html',
    string.format(
      [[
<a class="topic-card" href="%s"%s style="--accent: %s; --tag-bg: %s; --tag-fg: %s">
<div class="topic-thumb%s"><img src="%s" alt="" loading="lazy" /><div class="topic-tags">%s</div></div>
<h3 class="cardtitle">%s</h3>
</a>
]],
      a.href or '#',
      target_attr,
      style.accent,
      style.label_bg,
      style.label_fg,
      fit,
      a.thumb or '',
      table.concat(labels, ''),
      a.title or ''
    )
  )
end

local function render_topics(el)
  return pandoc.RawBlock('html', '<div class="topics-grid">\n' .. inner_html(el) .. '\n</div>')
end

-- label text per callout type; colors live in css/site.css (.callout-*)
local announcement_labels = {
  reminder = 'Reminder',
  materials = 'Materials Needed',
  tip = 'Tip',
  gallery = 'Gallery',
}

local function callout(kind, label, body)
  return pandoc.RawBlock(
    'html',
    string.format(
      '<div class="callout callout-%s">\n<span class="callout-label">%s</span>\n%s\n</div>',
      kind,
      label,
      body
    )
  )
end

local function render_announcement(el)
  local kind = el.attributes.type
  if not announcement_labels[kind] then kind = 'reminder' end
  return callout(kind, announcement_labels[kind], inner_html(el))
end

local function render_nextweek(el)
  return callout('nextweek', 'Looking Ahead', inner_html(el))
end

local function render_day(el)
  local a = el.attributes
  local open_class = (a.open == 'true') and 'uk-open' or ''

  return pandoc.RawBlock(
    'html',
    string.format(
      [[
<li class="%s">
<a class="uk-accordion-title" href="#">%s</a>
<div class="uk-accordion-content" style="padding-bottom:20px; margin-bottom:20px">
%s
</div>
</li>
]],
      open_class,
      a.title or '',
      inner_html(el)
    )
  )
end

local function render_days(el)
  return pandoc.RawBlock(
    'html',
    string.format(
      [[
<ul uk-accordion style="padding-bottom: 5vh">
%s
</ul>
]],
      inner_html(el)
    )
  )
end

function Div(el)
  if el.classes:includes('card') then
    return render_card(el)
  end
  if el.classes:includes('topics') then
    return render_topics(el)
  end
  if el.classes:includes('announcement') then
    return render_announcement(el)
  end
  if el.classes:includes('nextweek') then
    return render_nextweek(el)
  end
  if el.classes:includes('day') then
    return render_day(el)
  end
  if el.classes:includes('days') then
    return render_days(el)
  end
end
