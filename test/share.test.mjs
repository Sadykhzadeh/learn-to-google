// Runs the script behind the "send this page" form against a stand-in for
// the page, and checks that every link it makes brings back the question
// exactly as it was typed.
//
//   node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const code = readFileSync(new URL('../src/share.js', import.meta.url), 'utf8');
const home = 'https://azer.is-a.dev/learn-to-google/lan/en/';

function open({ search = '', clipboard, share, execCommand = () => false } = {}) {
	const handlers = {};
	let focused;
	const on = (name) => (type, handler) => { handlers[`${name}:${type}`] = handler; };
	const field = (name, value) => ({ value, addEventListener: on(name), focus() { focused = name; }, select() {} });
	const elements = { q: field('q', ''), lang: field('lang', home), link: field('link', '') };
	const status = { textContent: '', getAttribute: (name) => name };
	const send = { hidden: true, addEventListener: on('send') };
	const form = { elements, querySelector: (selector) => (selector === '.send' ? send : status), addEventListener: on('form') };
	const links = [{ search: '' }, { search: '' }];
	const document = {
		querySelector: () => form,
		querySelectorAll: () => links,
		execCommand,
	};
	runInNewContext(code, {
		document,
		location: { search },
		navigator: { clipboard, share },
		window: { isSecureContext: true },
		URLSearchParams,
		encodeURIComponent,
		Promise,
	});
	return {
		elements,
		status,
		send,
		links,
		type(value) {
			elements.q.value = value;
			handlers['q:input']();
			return elements.link.value;
		},
		submit() {
			handlers['form:submit']({ preventDefault() {} });
			return new Promise((resolve) => setImmediate(resolve));
		},
		share() {
			handlers['send:click']();
			return new Promise((resolve) => setImmediate(resolve));
		},
		focused: () => focused,
	};
}

const asked = (link) => new URL(link).searchParams.get('q');

test('links to the page alone when there is no question', () => {
	const page = open();
	assert.equal(page.elements.link.value, home);
	assert.equal(page.type('   '), home);
});

test('brings back every question exactly, trimmed', () => {
	const page = open();
	for (const q of [
		'What is polymorphism?',
		'a & b = c?',
		'C++ vs C#',
		'100% sure',
		'Что такое ООП?',
		'Polimorfizm nədir?',
		'naïve café',
		'why 😀?',
		'a/b\\c',
		"what's (this)!",
		'two  spaces',
		'a b',
		'پولی‌مورفیسم نه‌دیر؟',
	]) {
		const link = page.type(`  ${q} `);
		assert.ok(link.startsWith(home + '?q='), link);
		assert.equal(asked(link), q);
	}
});

test('keeps letters readable and spaces as plus signs', () => {
	assert.equal(open().type('Что такое ООП?'), home + '?q=Что+такое+ООП%3F');
});

test('leaves out nothing a chat would cut the link short at', () => {
	const page = open();
	for (const q of ['Help!', 'How do I exit vim...', 'What is OOP (in Java)', 'a (b c', 'a b) c', 'smile :)', "it's mine'", 'C*', 'snake_', 'tilde~', 'dash-', 'Why?', 'list:', 'a,']) {
		const link = page.type(q);
		assert.match(link, /([A-Za-z0-9]|%[0-9A-F]{2})$/, link);
		assert.doesNotMatch(link, /[()]/, link);
		assert.equal(asked(link), q);
	}
	assert.equal(page.type('Help!'), home + '?q=Help%21');
	assert.equal(page.type("it's (not) a.b-c!"), home + "?q=it's+%28not%29+a.b-c%21");
});

test('links to the language picked', () => {
	const page = open();
	page.elements.lang.value = 'https://azer.is-a.dev/learn-to-google/';
	assert.equal(page.type('x'), 'https://azer.is-a.dev/learn-to-google/?q=x');
});

test('says the link is copied', async () => {
	let copied;
	const page = open({ clipboard: { writeText: async (text) => { copied = text; } } });
	page.type('What is polymorphism?');
	await page.submit();
	assert.equal(copied, home + '?q=What+is+polymorphism%3F');
	assert.equal(page.status.textContent, 'data-copied');
});

test('falls back to the copy command when the clipboard is refused', async () => {
	const page = open({ clipboard: { writeText: () => Promise.reject(new Error('denied')) }, execCommand: () => true });
	await page.submit();
	assert.equal(page.status.textContent, 'data-copied');
});

test('points at the link and says so when nothing can copy', async () => {
	const page = open();
	await page.submit();
	assert.equal(page.status.textContent, 'data-failed');
	assert.equal(page.focused(), 'link');
});

test('has no share button where the browser cannot share', () => {
	assert.equal(open().send.hidden, true);
});

test('shares the link as it stands, question included', async () => {
	const shared = [];
	const page = open({ share: async (data) => { shared.push(data); } });
	assert.equal(page.send.hidden, false);
	page.type('Help!');
	await page.share();
	assert.deepEqual(shared.map((data) => data.url), [home + '?q=Help%21']);
});

test('says nothing when the share sheet is closed without sharing', async () => {
	const page = open({ share: () => Promise.reject(new Error('AbortError')) });
	await page.share();
	assert.equal(page.status.textContent, '');
});

test('carries a question from the address into the language links', () => {
	const page = open({ search: '?q=Why+is+the+sky+blue%3F' });
	for (const link of page.links) assert.equal(new URLSearchParams(link.search).get('q'), 'Why is the sky blue?');
});
