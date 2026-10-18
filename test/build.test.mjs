// Runs the build's translation checks on a copy of the site in which one
// translation is broken, and checks that the build stops and names the problem.
//
//   node --test
import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repo = fileURLToPath(new URL('..', import.meta.url));
const questions = /questions: \[[^\]]*\]/;

// The build writes pages, so it runs on a copy. `edit` changes i18n/en.mjs.
function check(edit) {
	const dir = mkdtempSync(join(tmpdir(), 'learn-to-google-'));
	try {
		for (const name of ['build.mjs', 'i18n', 'src', 'css', 'img', 'lan', 'index.html', '404.html']) {
			cpSync(join(repo, name), join(dir, name), { recursive: true });
		}
		const file = join(dir, 'i18n', 'en.mjs');
		writeFileSync(file, edit(readFileSync(file, 'utf8')));
		return spawnSync(process.execPath, ['build.mjs', '--check'], { cwd: dir, encoding: 'utf8' });
	} finally {
		rmSync(dir, { recursive: true, force: true });
	}
}

test('the site as it is passes the check', () => {
	const run = check((source) => source);
	assert.equal(run.status, 0, run.stderr);
});

test('a blank example question stops the build and names it', () => {
	const run = check((source) => source.replace(questions, "questions: ['Why do we need inheritance?', '', 'What is polymorphism?']"));
	assert.equal(run.status, 1);
	assert.match(run.stderr, /i18n\/en\.mjs: questions has an empty entry/);
});

test('a missing example question stops the build and names it', () => {
	const run = check((source) => source.replace(questions, "questions: ['Why do we need inheritance?', 'What is polymorphism?']"));
	assert.equal(run.status, 1);
	assert.match(run.stderr, /i18n\/en\.mjs: questions has 2 of the 3 in i18n\/ru\.mjs/);
});

test('an empty list of example questions stops the build', () => {
	const run = check((source) => source.replace(questions, 'questions: []'));
	assert.equal(run.status, 1);
	assert.match(run.stderr, /i18n\/en\.mjs: questions is empty/);
});
