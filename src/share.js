// The "send this page" form at the bottom of every translation. It builds a
// link to the chosen translation, carrying the question that was asked if
// there is one, and copies it. Enter in the question field copies too.
// src/page.mjs inlines this file into every page.
(function () {
	var form = document.querySelector('.share');
	var question = form.elements.q, language = form.elements.lang, link = form.elements.link;
	var status = form.querySelector('[role="status"]');

	// Letters stay readable, so a question in Cyrillic does not turn into a
	// wall of %D0%A7 when the link is pasted into a chat; browsers encode them
	// on the way out. Spaces become "+", and anything that means something in
	// a URL is percent-encoded. So are brackets, and punctuation at the very
	// end, which chats leave out of the link they make: "Help!" would arrive
	// as "Help", and "a (b" as "a ".
	function encode(text) {
		var chars = Array.from(text), last = chars.length - 1;
		return chars.map(function (c, i) {
			if (c === ' ') return '+';
			if (/[A-Za-z0-9]/.test(c) || (c.charCodeAt(0) > 127 && /[\p{L}\p{N}\p{M}]/u.test(c))) return c;
			if (i < last && /[._~!'*-]/.test(c)) return c;
			// encodeURIComponent leaves these as they are.
			if (/[._~!'()*-]/.test(c)) return '%' + c.charCodeAt(0).toString(16).toUpperCase();
			return encodeURIComponent(c);
		}).join('');
	}

	function update() {
		var q = question.value.trim();
		link.value = language.value + (q ? '?q=' + encode(q) : '');
		status.textContent = '';
	}

	// The clipboard API where it is allowed, the old way where it is not
	// (plain http, older browsers, some in-app browsers).
	function copy(text) {
		var api = navigator.clipboard && window.isSecureContext ? navigator.clipboard.writeText(text) : Promise.reject();
		return api.catch(function () {
			link.select();
			if (!document.execCommand('copy')) throw new Error('copy');
		});
	}

	question.addEventListener('input', update);
	language.addEventListener('change', update);
	link.addEventListener('focus', function () { link.select(); });
	form.addEventListener('submit', function (event) {
		event.preventDefault();
		update();
		copy(link.value).then(function () {
			status.textContent = status.getAttribute('data-copied');
		}, function () {
			link.focus();
			status.textContent = status.getAttribute('data-failed');
		});
	});
	update();

	// Someone who arrived with a question keeps it when they switch language.
	var asked = new URLSearchParams(location.search).get('q');
	if (asked) {
		document.querySelectorAll('.languages a, .suggest a').forEach(function (a) {
			a.search = '?' + new URLSearchParams({ q: asked });
		});
	}
})();
