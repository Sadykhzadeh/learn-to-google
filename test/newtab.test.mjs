// Every link that opens a new tab says so to screen readers, in the page's
// language, and the notice is hidden from sight.
//
//   node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import languages from '../i18n/index.mjs';
import page, { esc } from '../src/page.mjs';

// The inside of each link that opens a new tab.
const newTabLinks = (html) => [...html.matchAll(/<a [^>]*target="_blank"[^>]*>([\s\S]*?)<\/a>/g)].map((match) => match[1]);

test('every link that opens a new tab ends with its notice, in each language', () => {
	for (const t of languages) {
		const links = newTabLinks(page(t, languages));
		assert.ok(links.length > 0, `${t.lang}: the page has links that open a new tab`);
		const notice = `<span class="visually-hidden"> (${esc(t.ui.newTab)})</span>`;
		for (const inside of links) {
			assert.ok(inside.endsWith(notice), `${t.lang}: ${inside}`);
		}
	}
});

test('the notice is hidden from sight by a class the page defines', () => {
	for (const t of languages) {
		assert.match(page(t, languages), /\.visually-hidden\s*\{/, t.lang);
	}
});
