// Renders every translation of the page, and the 404 page, from src/ and i18n/.
//
//   node build.mjs           write index.html, lan/*/index.html and 404.html
//   node build.mjs --check   change nothing; fail if a generated file is stale
//                            or links to a local file that does not exist
//
// No dependencies: any Node from 18 on will do.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import languages from './i18n/index.mjs';
import page from './src/page.mjs';
import notFound from './src/404.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const check = process.argv.includes('--check');

// A translation that lacks a string would print "undefined" on the live page,
// so every one must have exactly the strings the first one has, none empty.
const keys = (strings, prefix = '') =>
	Object.entries(strings).flatMap(([key, value]) =>
		value && typeof value === 'object' && !Array.isArray(value) ? keys(value, `${prefix}${key}.`) : [`${prefix}${key}`]);
const get = (strings, path) => path.split('.').reduce((value, key) => value?.[key], strings);
const reference = keys(languages[0]);
let incomplete = 0;
for (const t of languages) {
	const own = keys(t);
	const problems = [
		...reference.filter((k) => !own.includes(k)).map((k) => `missing ${k}`),
		...own.filter((k) => !reference.includes(k)).map((k) => `${k} is not in i18n/${languages[0].lang}.mjs`),
		...own.filter((k) => get(t, k) === '' && k !== 'dir').map((k) => `${k} is empty`),
	];
	for (const problem of problems) console.error(`i18n/${t.lang}.mjs: ${problem}`);
	incomplete += problems.length;
}
if (incomplete) process.exit(1);

const outputs = [
	...languages.map((t) => ({ file: t.dir + 'index.html', html: page(t, languages) })),
	{ file: '404.html', html: notFound(languages) },
];

// Every local file a page refers to, as a path from the site root.
function localRefs(file, html) {
	const refs = [];
	for (const [, attr, value] of html.matchAll(/\s(href|src|srcset)="([^"]*)"/g)) {
		const urls = attr === 'srcset' ? value.split(',').map((c) => c.trim().split(/\s+/)[0]) : [value];
		for (const url of urls) {
			if (!url || /^[a-z][a-z0-9+.-]*:|^#|^\/\//i.test(url)) continue;
			let path = url.replace(/[?#].*$/, '');
			path = path.startsWith('/learn-to-google/')
				? path.slice('/learn-to-google/'.length)
				: posix.join(posix.dirname(file), path);
			if (path === '.' || path.endsWith('/')) path = posix.join(path, 'index.html');
			refs.push({ url, path });
		}
	}
	return refs;
}

let failed = 0;
for (const { file, html } of outputs) {
	const target = join(root, file);
	if (!check) {
		mkdirSync(dirname(target), { recursive: true });
		writeFileSync(target, html);
		console.log(`wrote ${file}`);
		continue;
	}
	const current = existsSync(target) ? readFileSync(target, 'utf8').replace(/\r\n/g, '\n') : null;
	if (current !== html) {
		console.error(`${file} is out of date: run node build.mjs`);
		failed++;
	}
	for (const { url, path } of localRefs(file, html)) {
		if (!existsSync(join(root, path))) {
			console.error(`${file} links to ${url}, and ${path} does not exist`);
			failed++;
		}
	}
}
if (check) {
	if (failed) process.exit(1);
	console.log(`${outputs.length} pages up to date, every local link resolves`);
}
