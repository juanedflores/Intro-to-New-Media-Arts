---
title: map() function
---

# map()

## What it does

map() re-maps a number from one range to another.

## Example use case:

When working with analog inputs and outputs, you often need to convert a value from one range to another.

- analogRead() returns a value between `0 and 1023`.
- analogWrite() expects a value between `0 and 255`.

To use the range of values from analogRead() as input to analogWrite(), you need to re-map the value from the range `0-1023` to the range `0-255`.

Say you have a variable that holds the analogRead() value coming from a potentiometer:

```arduino
// Will store a value between 0 and 1023
int val = analogRead(0);
```

If you want to use this value as input to analogWrite(), there won't be any errors, but it will reach the max value 255 when the potentiometer is only about <strong>1/4 turned</strong>.

##### To fix this, you can use the map() function:

You want do this range conversion:

<div>
<p style="text-align: center">
`0-1023` ---> `0-255`
</p>
</div>

---

## Parameters

The `map()` function has 5 parameters:

```c
map(value, fromLow, fromHigh, toLow, toHigh)
```

- `value`: the number to be mapped
- `fromLow`: the lower bound of the value's current range
- `fromHigh`: the upper bound of the value's current range
- `toLow`: the lower bound of the value's target range
- `toHigh`: the upper bound of the value's target range

##### value

The <strong>value</strong> parameter is the number you want to map from one range to another.

<div>
<p style="text-align: center">
`value` ---> `val`
</p>
</div>

##### starting range

<strong>fromLow</strong> and <strong>fromHigh</strong> define the range of the input value.

<div>
<p style="text-align: center">
`fromLow` ---> `0`
</p>
</div>

<div>
<p style="text-align: center">
`fromHigh` ---> `1023`
</p>
</div>

##### target range

<strong>toLow</strong> and <strong>toHigh</strong> define the target range that we want.

<div>
<p style="text-align: center">
`toLow` ---> `0`
</p>
</div>

<div>
<p style="text-align: center">
`toHigh` ---> `255`
</p>
</div>

## Full Sketch

```arduino
void setup() {
  Serial.begin(9600);
}

void loop() {
  int val = analogRead(0);

  Serial.print("Input value: ");
  Serial.println(val);

  int mapped_val = map(val, 0, 1023, 0, 255); // mapping function

  Serial.print("Output value: ");
  Serial.println(mapped_val);

  analogWrite(9, mapped_val); // output in 0-255 range
  delay(200);

  Serial.println("");
}
```

<blockquote class="info">
<span class="uk-label uk-label-warning">Info</span>
<p>Check out the official Arduino documentation for the map() function:</p>
<a href="https://docs.arduino.cc/language-reference/en/functions/math/map/">map()</a>
</blockquote>
