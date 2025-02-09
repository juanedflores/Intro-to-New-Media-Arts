---
title: Preview
---

# Blog Workflow with Neovim
## Snippets

With `blink.cmp` and `friendly-snippets`, I am provided with some useful snippets. For example to create a 2x3 table:

```json
"Insert 2x3 table": {
    "prefix": "2x3table",
    "body": [
        "| ${1:Column1} | ${2:Column2} | ${3:Column3} |",
        "| --------------- | --------------- | --------------- |",
        "| ${4:Item1.1} | ${5:Item2.1} | ${6:Item3.1} |",
        "${0}"
    ],
    "description": "Insert table with 2 rows and 3 columns. First row is heading."
},
```

Start typing the prefix `2x3table~` and hit `<C-y>` to autocomplete selection when it comes up. Then just press `<CR>` to confirm. The snippet will be be placed down in the editor and you can start writing inside the cells one by one by pressing Tab to go to the next one.


| Column1 | Column2 | Column3 |
| --------------- | --------------- | --------------- |
| Item1.1 | Item2.1 | Item3.1 |

## markview.nvim

This is rendered like this in nvim because of [markview](https://github.com/OXY2DEV/markview.nvim)
![table_vim](./images/table_vim.png)

---

## Styling

On the table example shown above, I am using [UIkit](https://getuikit.com/docs/introduction) styling.

All tables are added these classes: `uk-table`, `uk-table-striped`, `uk-table-hover`, and `uk-table-middle`.

They are added after page is loaded with this function (using JQuery).

```js
function table_hl() {
    $('table').addClass('uk-table');
    $('table').addClass('uk-table-striped');
    $('table').addClass('uk-table-hover');
    $('table').addClass('uk-table-middle');
}

table_hl();
```

## Code Inline and Blocks

I am using [highlight.js](https://highlightjs.org/) to highlight code blocks with a custom css theme. Documentation on how to use is provided [here](https://highlightjs.readthedocs.io/en/latest/readme.html). Additionally, I added badges on the top right of code blocks to make it easy to copy the content with icons for better user experience. The addon is called [highlightjs-badge](https://github.com/RickStrahl/highlightjs-badge).

You can overwrite the default styling by defining new rules in the html file under `<style></style>` tags.

```html
<style>
    .code-badge {
        padding: 8px !important;
        background: pink !important;
    }
    .code-badge-copy-icon {
        font-size: 1.3em !important;
    }
</style>
```

