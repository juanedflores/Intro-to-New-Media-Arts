-- Initial variables
-- The screen is 128x128 pixels, centered at (64, 64)
x = 64
y = 64

function _init()
  -- Optional: set a specific seed for reproducible random walks,
  -- or call srand() once with no argument for a time-based seed.
  -- For this continuous random walk, no specific seed is needed.
end

function _update()
  -- Generate a random number between 0 and 4 (exclusive)
  -- and use it to choose a direction.
  -- flr() is used to get an integer value.
  local direction = flr(rnd(4))

  if direction == 0 then
    -- Move left
    x = x - 1
  elseif direction == 1 then
    -- Move right
    x = x + 1
  elseif direction == 2 then
    -- Move up
    y = y - 1
  else
    -- Move down (direction must be 3)
    y = y + 1
  end

  -- Optional: keep the walker within screen boundaries
  x = mid(0, x, 127)
  y = mid(0, y, 127)
end

function _draw()
  -- cls() clears the screen every frame, showing only the current position.
  -- To draw the path, comment out this line:
  -- cls(0)

  -- Draw the walker as a small circle or point
  -- The color (e.g., 7 for white) can be changed
  pset(x, y, 7)
end
