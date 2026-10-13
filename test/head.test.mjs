// Runs the script in <head> (theme and language offer) against a stand-in
// for the page, the browser's settings and its storage.
//
//   node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import languages from '../i18n/index.mjs';
import { headScript } from '../src/page.mjs';

const light = '#fff', dark = '#1c1c1e';

// `on` lists what a clicked element is inside of, e.g. ['.suggest', '.suggest button'].
const clicked = (...on) => ({ target: { closest: (selector) => selector.split(', ').some((s) => on.includes(s)) } });

function open({ lang = 'ru', system = 'light', stored = {}, browser = [lang], storage = true, safari13 = false } = {}) {
	const attributes = {}, classes = [], listeners = {}, styles = [];
	const root = {
		setAttribute: (name, value) => { attributes[name] = String(value); },
		getAttribute: (name) => attributes[name] ?? null,
		removeAttribute: (name) => { delete attributes[name]; },
		classList: { add: (name) => classes.push(name) },
	};
	const toolbar = [{ content: light }, { content: dark }];
	const button = { pressed: null, setAttribute(name, value) { this.pressed = String(value); } };
	let parsed = false;
	const media = { matches: system === 'dark', addEventListener: (type, f) => { listeners[`media:${type}`] = f; } };
	// Safari before 14 only has the older way to listen.
	if (safari13) {
		delete media.addEventListener;
		media.addListener = (f) => { listeners['media:change'] = f; };
	}
	const store = new Map(Object.entries(stored).map(([key, value]) => [`learn-to-google:${key}`, value]));
	const document = {
		documentElement: root,
		querySelectorAll: () => toolbar,
		// The theme button is further down, so it is not there until the page is parsed.
		querySelector: () => (parsed ? button : null),
		addEventListener: (type, f) => { listeners[type] = f; },
		createElement: () => ({ textContent: '' }),
		head: { appendChild: (style) => styles.push(style.textContent) },
	};
	const context = {
		document,
		matchMedia: () => media,
		navigator: { languages: browser },
		addEventListener: (type, f) => { listeners[`window:${type}`] = f; },
	};
	Object.defineProperty(context, 'localStorage', {
		get() {
			if (!storage) throw new Error('SecurityError');
			return { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) };
		},
	});
	runInNewContext(headScript(languages.find((l) => l.lang === lang), languages), context);
	return {
		get theme() { return attributes['data-theme']; },
		get toolbar() { return toolbar.map((meta) => meta.content); },
		get pressed() { return button.pressed; },
		get offer() { return attributes['data-suggest']; },
		classes,
		styles,
		stored: (key) => store.get(`learn-to-google:${key}`),
		store: (key, value) => (value ? store.set(`learn-to-google:${key}`, value) : store.delete(`learn-to-google:${key}`)),
		parse() { parsed = true; listeners.DOMContentLoaded(); },
		click(...on) { listeners.click(clicked(...on)); },
		system(scheme) { media.matches = scheme === 'dark'; listeners['media:change'](); },
		back() { listeners['window:pageshow']({ persisted: true }); },
	};
}

test('follows the system, toolbar included', () => {
	const day = open({ system: 'light' }), night = open({ system: 'dark' });
	assert.equal(day.theme, 'light');
	assert.deepEqual(day.toolbar, [light, light]);
	assert.equal(night.theme, 'dark');
	assert.deepEqual(night.toolbar, [dark, dark]);
	assert.deepEqual(day.classes, ['js']);
});

test('keeps following the system when it switches', () => {
	const page = open({ system: 'light' });
	page.system('dark');
	assert.equal(page.theme, 'dark');
	assert.deepEqual(page.toolbar, [dark, dark]);
});

test('a stored choice wins over the system, toolbar included', () => {
	const page = open({ system: 'dark', stored: { theme: 'light' } });
	assert.equal(page.theme, 'light');
	assert.deepEqual(page.toolbar, [light, light]);
	page.system('light');
	page.system('dark');
	assert.equal(page.theme, 'light');
});

test('marks the button pressed once it is there', () => {
	const page = open({ system: 'dark' });
	assert.equal(page.pressed, null);
	page.parse();
	assert.equal(page.pressed, 'true');
});

test('the button switches theme and remembers it, until it goes back to the system', () => {
	const page = open({ system: 'light' });
	page.parse();
	page.click('.theme');
	assert.equal(page.theme, 'dark');
	assert.equal(page.pressed, 'true');
	assert.deepEqual(page.toolbar, [dark, dark]);
	assert.equal(page.stored('theme'), 'dark');
	page.click('.theme');
	assert.equal(page.theme, 'light');
	assert.equal(page.pressed, 'false');
	assert.equal(page.stored('theme'), undefined);
	page.system('dark');
	assert.equal(page.theme, 'dark');
});

test('offers the first of the reader\'s languages there is a translation in', () => {
	const page = open({ lang: 'ru', browser: ['de-DE', 'uk-UA', 'en-US'] });
	assert.equal(page.offer, 'uk');
	assert.deepEqual(page.styles, ['[data-suggest] .suggest [lang="uk"] { display: flex; }']);
});

test('offers nothing when the page is in one of the reader\'s languages', () => {
	assert.equal(open({ lang: 'ru', browser: ['en-US', 'ru-RU'] }).offer, undefined);
	assert.equal(open({ lang: 'en', browser: ['en-GB'] }).offer, undefined);
});

test('offers nothing when no translation is in the reader\'s languages', () => {
	const page = open({ lang: 'ru', browser: ['de-DE', 'fr'] });
	assert.equal(page.offer, undefined);
	assert.deepEqual(page.styles, []);
});

test('stops offering once the reader closes the offer or picks a language', () => {
	const closed = open({ browser: ['en-US'] });
	closed.click('.suggest', '.suggest button');
	assert.equal(closed.offer, undefined);
	assert.equal(closed.stored('language'), 'chosen');
	assert.equal(open({ browser: ['en-US'], stored: { language: 'chosen' } }).offer, undefined);

	const picked = open({ browser: ['en-US'] });
	picked.click('.languages');
	assert.equal(picked.stored('language'), 'chosen');
});

test('catches up with what was picked on another page after Back or Forward', () => {
	const page = open({ system: 'light', browser: ['en-US'] });
	page.parse();
	assert.equal(page.offer, 'en');
	page.store('theme', 'dark');
	page.store('language', 'chosen');
	page.back();
	assert.equal(page.theme, 'dark');
	assert.equal(page.pressed, 'true');
	assert.deepEqual(page.toolbar, [dark, dark]);
	assert.equal(page.offer, undefined);
	page.store('theme', null);
	page.back();
	assert.equal(page.theme, 'light');
});

test('still themes and switches without storage', () => {
	const page = open({ system: 'dark', storage: false, browser: ['en-US'] });
	page.parse();
	assert.equal(page.theme, 'dark');
	assert.equal(page.offer, 'en');
	page.click('.theme');
	assert.equal(page.theme, 'light');
});

test('works in Safari 13 and older, which listen to the system the old way', () => {
	const page = open({ system: 'light', browser: ['en-US'], safari13: true });
	page.parse();
	assert.equal(page.offer, 'en');
	page.system('dark');
	assert.equal(page.theme, 'dark');
	page.click('.theme');
	assert.equal(page.theme, 'light');
});
