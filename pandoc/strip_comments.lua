-- Leaves <!-- HTML comments --> out of the built page, so drafts and notes
-- commented out in the .md (next Wednesday's plan, old agendas) stay in the
-- source and don't get published. Code blocks are untouched.

local function strip(el)
  if el.format ~= 'html' then return nil end
  local text = el.text:gsub('<!%-%-.-%-%->', '')
  if text == el.text then return nil end
  if text:match('^%s*$') then return {} end
  el.text = text
  return el
end

return {
  { RawBlock = strip, RawInline = strip },
}
