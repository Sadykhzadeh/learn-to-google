// Runs the script that shows a question from ?q= against a minimal stand-in
// for the page, so odd links can be tried without a browser.
//
//   node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { askedScript } from '../src/page.mjs';

function open(search) {
	const link = { href: '' };
	const asked = { hidden: true, firstElementChild: { textContent: '' } };
	const search_ = { hidden: true, firstElementChild: link };
	const document = { getElementById: (id) => (id === 'asked' ? asked : search_) };
	runInNewContext(askedScript, { document, location: { search }, URLSearchParams, encodeURIComponent });
	return { shown: !asked.hidden && !search_.hidden, text: asked.firstElementChild.textContent, href: link.href };
}

test('shows the question and links to a search for it', () => {
	const r = open('?q=What+is+polymorphism%3F');
	assert.equal(r.shown, true);
	assert.equal(r.text, 'What is polymorphism?');
	assert.equal(r.href, 'https://www.google.com/search?q=What%20is%20polymorphism%3F');
});

test('shows nothing without a question', () => {
	for (const search of ['', '?q=', '?q=%20%20', '?other=1']) assert.equal(open(search).shown, false, search);
});

test('keeps at most 200 characters', () => {
	assert.equal(open('?q=' + 'a'.repeat(500)).text.length, 200);
});

test('does not cut an emoji in half at the limit', () => {
	const r = open('?q=' + 'a'.repeat(199) + encodeURIComponent('\u{1F600}') + 'x');
	assert.equal(r.shown, true);
	assert.equal(r.text, 'a'.repeat(199) + '\u{1F600}');
});

test('treats markup as text', () => {
	const r = open('?q=' + encodeURIComponent('<img src=x onerror=alert(1)>'));
	assert.equal(r.text, '<img src=x onerror=alert(1)>');
});
