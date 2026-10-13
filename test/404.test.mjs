// Runs the script of the 404 page against stand-in addresses, to check which
// old links it forwards and where to.
//
//   node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import languages from '../i18n/index.mjs';
import notFound from '../src/404.mjs';

const code = notFound(languages).match(/<script>([\s\S]*?)<\/script>/)[1];

function open(address) {
	const url = new URL(address, 'https://azer.is-a.dev');
	let replaced = null;
	const location = { pathname: url.pathname, search: url.search, hash: url.hash, replace: (to) => { replaced = to; } };
	const document = { documentElement: { setAttribute() {} } };
	runInNewContext(code, { location, document, localStorage: { getItem: () => null } });
	return replaced;
}

test('forwards links from before the move to lan/, with the question and fragment', () => {
	assert.equal(open('/learn-to-google/en'), '/learn-to-google/lan/en');
	assert.equal(open('/learn-to-google/en/'), '/learn-to-google/lan/en/');
	assert.equal(open('/learn-to-google/az/'), '/learn-to-google/lan/az/');
	assert.equal(open('/learn-to-google/ua/?q=Test#x'), '/learn-to-google/lan/ua/?q=Test#x');
	assert.equal(open('/learn-to-google/en/index.html'), '/learn-to-google/lan/en/index.html');
	assert.equal(open('/learn-to-google/en/img/bad-good.png'), '/learn-to-google/lan/en/img/bad-good.png');
});

test('leaves every other missing page on the 404', () => {
	for (const address of [
		'/learn-to-google/nope',
		'/learn-to-google/enx/',
		'/learn-to-google/uz/',
		'/learn-to-google/lan/xx/',
		'/learn-to-google/lan/en/missing.html',
		'/en/',
	]) assert.equal(open(address), null, address);
});
