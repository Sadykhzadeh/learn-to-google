// The page itself. build.mjs renders it once per translation in i18n/.
import { readFileSync } from 'node:fs';
import { join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

export const site = 'https://azer.is-a.dev/learn-to-google/';
const root = fileURLToPath(new URL('..', import.meta.url));

// Width and height from a PNG's header, so the page can hold the picture's
// place before it arrives instead of jumping when it does.
const pngSize = (file) => {
	const header = readFileSync(join(root, file)).subarray(16, 24);
	return [header.readUInt32BE(0), header.readUInt32BE(4)];
};

export const esc = (s) =>
	String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// A link from the page in `dir` to `target`, both relative to the site root.
// Directories end in a slash and keep it.
export function rel(dir, target) {
	const r = posix.relative(dir || '.', target || '.');
	return target === '' || target.endsWith('/') ? (r ? r + '/' : './') : r;
}

const indent = (html, depth) =>
	html.trim().split('\n').map((line) => (line ? '\t'.repeat(depth) + line : line)).join('\n');

// Inline scripts ship without their comment lines: those are for whoever
// edits the source, not for every visitor. Split on CRLF too, or a Windows
// checkout would build pages that differ from the committed ones.
const script = (code, depth) => indent(code.split(/\r?\n/).filter((line) => !/^\s*\/\//.test(line)).join('\n'), depth);

// Runs in <head>, before anything is drawn, so nothing on the page moves or
// flashes once it appears.
//
// Theme: without a stored choice it follows the system, and keeps following
// it if the system switches.
//
// Language: if none of the reader's languages is this page's but one of them
// is another translation, the bar offering it is shown. Never once they have
// closed it or picked a language themselves, and never as a redirect: a link
// shared in a particular language has to open in that language.
export const headScript = (t, languages) => `(function () {
	var root = document.documentElement, store = {}, dark = matchMedia('(prefers-color-scheme: dark)');
	try { store = localStorage; } catch (e) {}
	function get(key) { try { return store.getItem('learn-to-google:' + key); } catch (e) {} }
	function save(key, value) { try { value ? store.setItem('learn-to-google:' + key, value) : store.removeItem('learn-to-google:' + key); } catch (e) {} }
	var chosen = get('theme');
	// The browser paints its toolbar from these, and their media queries only know the system's setting.
	var toolbar = document.querySelectorAll('meta[name="theme-color"]'), toolbarColor = { light: toolbar[0].content, dark: toolbar[1].content };
	function apply() {
		var theme = chosen || (dark.matches ? 'dark' : 'light'), button = document.querySelector('.theme');
		root.setAttribute('data-theme', theme);
		if (button) button.setAttribute('aria-pressed', theme === 'dark');
		for (var i = 0; i < toolbar.length; i++) toolbar[i].content = toolbarColor[theme];
	}
	apply();
	root.classList.add('js');
	// Safari before 14 has only addListener for this.
	dark.addEventListener ? dark.addEventListener('change', apply) : dark.addListener(apply);
	document.addEventListener('DOMContentLoaded', apply);

	var others = ${JSON.stringify(languages.filter((l) => l !== t).map((l) => l.lang))};
	var wanted = (navigator.languages || [navigator.language]).map(function (l) { return String(l).toLowerCase().split('-')[0]; });
	var offer = wanted.indexOf(${JSON.stringify(t.lang)}) < 0 && wanted.filter(function (l) { return others.indexOf(l) >= 0; })[0];
	if (offer && !get('language')) {
		root.setAttribute('data-suggest', offer);
		var style = document.createElement('style');
		style.textContent = '[data-suggest] .suggest [lang="' + offer + '"] { display: flex; }';
		document.head.appendChild(style);
	}

	document.addEventListener('click', function (event) {
		var target = event.target;
		if (target.closest('.theme')) {
			var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
			// Picking what the system already wants means following the system again.
			chosen = next === (dark.matches ? 'dark' : 'light') ? null : next;
			save('theme', chosen);
			apply();
		} else if (target.closest('.suggest, .languages')) {
			save('language', 'chosen');
			if (target.closest('.suggest button')) root.removeAttribute('data-suggest');
		}
	});

	// Back and Forward can bring the page back exactly as it was left, so
	// catch up with a theme or a language picked on another page since.
	addEventListener('pageshow', function (event) {
		if (!event.persisted) return;
		chosen = get('theme');
		apply();
		if (get('language')) root.removeAttribute('data-suggest');
	});
})();`;

// Fills in the question from a link made with the form below (?q=...). It
// sits right after the two elements it fills, so they are in place before the
// rest of the page is parsed and nothing below them jumps.
export const askedScript = `(function () {
	// Cut by characters, not code units: a pair cut in half makes encodeURIComponent throw.
	var q = Array.from((new URLSearchParams(location.search).get('q') || '').trim()).slice(0, 200).join('');
	if (!q) return;
	var asked = document.getElementById('asked'), search = document.getElementById('google-it');
	asked.firstElementChild.textContent = q;
	search.firstElementChild.href = 'https://www.google.com/search?q=' + encodeURIComponent(q);
	asked.hidden = search.hidden = false;
})();`;

const shareScript = readFileSync(join(root, 'src/share.js'), 'utf8');

// The stylesheet goes inline too. It is small, almost everyone reads a single
// page, and as a separate file it held up the first paint by a round trip.
// Comments and line breaks go; every line in it ends in "{", ";", "}" or ","
// so nothing else changes meaning. css/main.css stays the file to edit.
const styles = readFileSync(join(root, 'css/main.css'), 'utf8')
	.replace(/\/\*[\s\S]*?\*\//g, '')
	.replace(/\s*\n\s*/g, '');

const octicon = 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z';

export default function page(t, languages) {
	const at = (target) => rel(t.dir, target);
	// The PNG stays for share previews and the full-size link; browsers that
	// take WebP get a copy a tenth of the size, 800px wide unless the screen
	// needs more.
	const [width, height] = pngSize(t.image);
	const webp = (suffix) => at(t.image.replace(/\.png$/, `${suffix}.webp`));
	return `<!DOCTYPE html>
<!-- Generated by build.mjs from src/ and i18n/${t.lang}.mjs. Edit those and run: node build.mjs -->
<html lang="${t.lang}">
	<head>
		<meta charset="utf-8">
		<title>${esc(t.title)}</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="color-scheme" content="light dark">
		<meta name="theme-color" content="#fff" media="(prefers-color-scheme: light)">
		<meta name="theme-color" content="#1c1c1e" media="(prefers-color-scheme: dark)">
		<script>
${script(headScript(t, languages), 3)}
		</script>
		<style>${styles}</style>
		<link rel="icon" href="${at('img/google_icon.ico')}">
		<meta property="og:type" content="website">
		<meta property="og:title" content="${esc(t.title)}">
		<meta property="og:image" content="${site}${t.image}">
		<meta property="og:image:width" content="${width}">
		<meta property="og:image:height" content="${height}">
		<meta property="og:image:alt" content="${esc(t.imageAlt)}">
		<meta property="og:description" content="${esc(t.description)}">
		<meta name="description" content="${esc(t.description)}">
		<meta property="og:url" content="${site}${t.dir}">
		<meta name="twitter:card" content="summary_large_image">
		<link rel="canonical" href="${site}${t.dir}">
${languages.map((l) => `\t\t<link rel="alternate" hreflang="${l.lang}" href="${site}${l.dir}">`).join('\n')}
		<link rel="alternate" hreflang="x-default" href="${site}">
	</head>
	<body>
		<aside class="suggest">
${languages.filter((l) => l !== t).map((l) => `\t\t\t<p lang="${l.lang}">
				<a href="${at(l.dir)}" hreflang="${l.lang}">${esc(l.ui.suggest)}</a>
				<button type="button" aria-label="${esc(l.ui.close)}"><svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg></button>
			</p>`).join('\n')}
		</aside>
		<header>
			<nav aria-label="${esc(t.ui.languages)}">
				<ul class="languages">
${languages.map((l) => `\t\t\t\t\t<li><a href="${at(l.dir)}" hreflang="${l.lang}" lang="${l.lang}"${l === t ? ' aria-current="page"' : ''}>${esc(l.name)}</a></li>`).join('\n')}
				</ul>
			</nav>
			<button class="theme" type="button" aria-pressed="false">${esc(t.ui.darkTheme)}</button>
		</header>
		<main>
			<h1>${esc(t.title)}</h1>
			<p>${esc(t.intro)}</p>
			<div class="dialog-line -you" id="asked" hidden>
				<div class="content" dir="auto"></div>
			</div>
${t.questions.map((q) => `\t\t\t<div class="dialog-line -you">
				<div class="content">${esc(q)}</div>
			</div>`).join('\n')}
			<p>${t.verdict}</p>
			<p class="google-it" id="google-it" hidden><a target="_blank" rel="noopener noreferrer" href="https://www.google.com/">${esc(t.ui.findAnswer)}</a></p>
			<script>
${script(askedScript, 4)}
			</script>
${indent(t.body, 3)}
			<p>${esc(t.pictureIntro)}</p>
			<a href="${at(t.image)}" title="${esc(t.imageTitle)}">
				<picture>
					<source type="image/webp" srcset="${webp('-800')} 800w, ${webp('')} ${width}w" sizes="(max-width: 768px) calc(100vw - 1.5rem), 800px">
					<img src="${at(t.image)}" width="${width}" height="${height}" alt="${esc(t.imageAlt)}" loading="lazy" decoding="async">
				</picture>
			</a>
			<form class="share" aria-labelledby="share-title">
				<h2 id="share-title">${esc(t.ui.shareTitle)}</h2>
				<label for="share-q">${esc(t.ui.shareQuestion)}</label>
				<input id="share-q" name="q" type="text" dir="auto" maxlength="200" autocomplete="off" placeholder="${esc(t.questions[t.questions.length - 1])}" aria-describedby="share-q-hint">
				<p class="hint" id="share-q-hint">${esc(t.ui.shareHint)}</p>
				<label for="share-lang">${esc(t.ui.shareLanguage)}</label>
				<select id="share-lang" name="lang">
${languages.map((l) => `\t\t\t\t\t<option value="${site}${l.dir}" lang="${l.lang}"${l === t ? ' selected' : ''}>${esc(l.name)}</option>`).join('\n')}
				</select>
				<label for="share-link">${esc(t.ui.shareLink)}</label>
				<div class="copy">
					<input id="share-link" name="link" type="text" readonly value="${site}${t.dir}">
					<button type="submit">${esc(t.ui.copy)}</button>
				</div>
				<p class="hint" role="status" data-copied="${esc(t.ui.copied)}" data-failed="${esc(t.ui.copyFailed)}"></p>
			</form>
		</main>
		<footer>
			<div class="row">
				${t.footer}
				<a href="https://github.com/sadykhzadeh/learn-to-google">${esc(t.github)}
					<svg aria-hidden="true" id="octicon-icon" height="24" version="1.1" width="24">
						<path fill-rule="evenodd" d="${octicon}"></path>
					</svg>
				</a>
			</div>
		</footer>
		<script>
${script(shareScript, 3)}
		</script>
	</body>
</html>
`;
}
