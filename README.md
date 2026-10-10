# "Learn to Google" website

[Russian](https://sadykhzadeh.github.io/learn-to-google/) | [English](https://sadykhzadeh.github.io/learn-to-google/lan/en/) | [Azerbaijani](https://sadykhzadeh.github.io/learn-to-google/lan/az/) | [Ukrainian](https://sadykhzadeh.github.io/learn-to-google/lan/ua/) | [Uzbek](https://sadykhzadeh.github.io/learn-to-google/lan/uz/)

The main purpose of the site is to explain the advantages of googling questions in a polite way to people who are too lazy to Google for unknown reasons.

## How it behaves

- The form at the bottom of the page makes a link for whoever asked: pick the language, optionally paste their question, and copy (Enter copies too). The question travels as `?q=`, for example [`/lan/en/?q=What+is+polymorphism%3F`](https://azer.is-a.dev/learn-to-google/lan/en/?q=What+is+polymorphism%3F), and the page shows it first among the example questions, with a button that searches Google for it.
- Each translation has its own URL, and a link always opens in the language it was shared in. If none of the reader's browser languages is the page's but one of them is another translation, a bar at the top offers that one; it stays away once they close it or pick a language.
- The theme follows the system's light or dark setting; the button in the header overrides it, and the choice is remembered.
- Everything works without JavaScript except the form, the question, the language offer and the theme button, which simply do not appear.

## Editing

Every translation is rendered from one template, so a change to the page is made once:

- `src/page.mjs` is the page; `src/share.js` is the script behind the form, inlined into it.
- `i18n/<lang>.mjs` holds the text of one translation; `i18n/index.mjs` lists them.
- `css/main.css` is the stylesheet. It is inlined into every page as well, so rebuild after changing it.

The HTML that gets served (`index.html`, `lan/*/index.html` and `404.html`) is generated. Edit the sources, regenerate, and commit both:

```sh
node build.mjs
```

`node build.mjs --check` writes nothing and fails if a page is out of date or links to a local file that does not exist. The build needs Node 18 or newer and has no dependencies; GitHub Pages serves the committed files as they are, so nothing is built on deploy.

To add a language, copy one of the files in `i18n/`, translate it, give it its own `lang` and `dir`, add it to `i18n/index.mjs` and run the build. A new string goes into every file in `i18n/`: the build stops and names the string if a translation is missing one, has one the others do not, or leaves one empty.

Each picture is a PNG (`bad-good.png`, kept for share previews and the full-size link) with two WebP copies next to it, which is what browsers actually download: `bad-good.webp` at full size and `bad-good-800.webp` 800px wide, both at quality 80. If you replace a PNG, make the WebP copies again, for example with `cwebp -q 80 -m 6 bad-good.png -o bad-good.webp` and the same with `-resize 800 0` for the smaller one.

## Contributors
1. [@byrvr](https://t.me/byrvr) for help with the website and translation into the Azerbaijani language.
2. [@devule](https://t.me/devule)  for help with the website and translation into the Ukrainian language.

### Author
by [Azer Sadykhzadeh](https://sadykhzadeh.github.io), 2020.
