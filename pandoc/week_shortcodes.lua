-- Shortcodes for authoring week pages with less repetitive HTML.
-- Enables:
--   ::: {.days} ... :::                                  accordion wrapper (one per week)
--   ::: {.day title="MONDAY" open="true"} ... :::         one collapsible day
--   ::: {.announcement type="reminder|materials"} ... :::  styled callout
--   ::: {.topics} ... :::                                 card grid wrapper
--   ::: {.card type="lesson|external|video" title="..." thumb="..." href="..." tag="..."} :::
--   ::: {.nextweek} ... :::                               "looking ahead" callout

local card_styles = {
  lesson   = { bg = "#fba99e",            label_bg = "#fba99e",            tag = "Lesson" },
  external = { bg = "rgb(210, 230, 250)", label_bg = "rgb(56, 79, 172)",   tag = "External" },
  video    = { bg = "#ffd97d",            label_bg = "#ffd97d",            tag = "Video" },
}

local function inner_html(el)
  return pandoc.write(pandoc.Pandoc(el.content), "html")
end

local function render_card(el)
  local a = el.attributes
  local style = card_styles[a.type] or card_styles.lesson

  -- tags: comma-separated list, e.g. tags="Blog,Output". Falls back to
  -- a single tag= attribute, then to the type's default tag.
  local tag_list = a.tags or a.tag or style.tag
  local labels = {}
  for t in tag_list:gmatch("[^,]+") do
    table.insert(labels, string.format(
      '<span class="uk-label" style="background-color: %s">%s</span>',
      style.label_bg, t:match("^%s*(.-)%s*$")))
  end

  local target_attr = (a.target and (' target="' .. a.target .. '"')) or ""

  return pandoc.RawBlock("html", string.format([[
<li>
<div>
<a href="%s"%s>
<div class="uk-card-small uk-card-default uk-card-body uk-box-shadow-xlarge" style="background: %s">
<div class="uk-card-small uk-card-default uk-card-body uk-box-shadow-xlarge">
<h3 class="cardtitle">%s</h3>
<div style="display: inline">
<img src="%s" alt="" style="padding-bottom: 10px" uk-image />
%s
</div>
</div>
</a>
</div>
</li>
]], a.href or "#", target_attr, style.bg, a.title or "", a.thumb or "", table.concat(labels, "\n")))
end

local function render_topics(el)
  return pandoc.RawBlock("html", string.format([[
<div class="uk-margin" style="padding: 30px;">
<ul class="uk-child-width-1-3@m uk-child-width-1-4@l uk-child-width-1-2@s uk-grid-small uk-grid-match" uk-grid="masonry: pack">
%s
</ul>
</div>
]], inner_html(el)))
end

local function render_announcement(el)
  local a = el.attributes
  local is_reminder = a.type ~= "materials"
  local border = is_reminder and "orange" or "blue"
  local block_class = is_reminder and "warning" or "info"
  local label_class = is_reminder and "uk-label-warning" or "uk-label-info"
  local label_text = is_reminder and "Reminder" or "Materials Needed"

  return pandoc.RawBlock("html", string.format([[
<blockquote class="%s" style="border: 1px %s solid; padding: 10px;">
<span class="uk-label %s">%s</span>
%s
</blockquote>
]], block_class, border, label_class, label_text, inner_html(el)))
end

local function render_nextweek(el)
  return pandoc.RawBlock("html", string.format([[
<blockquote class="info" style="border: 1px blue solid; padding: 10px; background: rgb(238, 241, 247);">
<span class="uk-label uk-label-info">Looking Ahead</span>
%s
</blockquote>
]], inner_html(el)))
end

local function render_day(el)
  local a = el.attributes
  local open_class = (a.open == "true") and "uk-open" or ""

  return pandoc.RawBlock("html", string.format([[
<li class="%s">
<a class="uk-accordion-title" href="#">%s</a>
<div class="uk-accordion-content" style="padding-bottom:20px; margin-bottom:20px">
%s
</div>
</li>
]], open_class, a.title or "", inner_html(el)))
end

local function render_days(el)
  return pandoc.RawBlock("html", string.format([[
<ul uk-accordion style="padding-bottom: 5vh">
%s
</ul>
]], inner_html(el)))
end

function Div(el)
  if el.classes:includes("card") then return render_card(el) end
  if el.classes:includes("topics") then return render_topics(el) end
  if el.classes:includes("announcement") then return render_announcement(el) end
  if el.classes:includes("nextweek") then return render_nextweek(el) end
  if el.classes:includes("day") then return render_day(el) end
  if el.classes:includes("days") then return render_days(el) end
end
