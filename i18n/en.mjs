export default {
	lang: 'en',
	dir: 'lan/en/',
	name: 'English',
	title: 'Please, learn to google!',
	description: "An article about what 'to google' means and why it's important.",
	intro: "Don't ask questions in chats/forums like:",
	questions: ['Why do we need inheritance?', 'Why is the sky blue?', 'What is polymorphism?'],
	// The crossed-out word is hidden from screen readers, which would read it as if it still stood.
	verdict: 'These kinds of questions you <s aria-hidden="true">can</s> should <b>google</b> first!',
	body: `
<p><b>To google</b> means:</p>
<ol>
	<li>Open <a target="_blank" rel="noopener noreferrer" href="https://google.com">Google</a> (or another search engine)</li>
	<li>Enter your request.</li>
</ol>
<p class="quote"> - I see, but what's wrong with asking these questions in chats/forums?</p>
<p> - Believe me, someone asked 99% of your questions in a forum a long time ago. This means that the answer is on the Internet. Therefore, by asking Google (or another search engine), you will not only get a quick response, but also avoid disturbing other people.</p>
<p class="quote">- So, is asking questions in chats/forums prohibited/unethical/bad?</p>
<p>Not really. If you have a question, first Google it, then if you can't find the answer, you can <s>search it in <a target="_blank" rel="noopener noreferrer" href="https://yandex.com">Yandex</a></s> ask your question in a forum.</p>
`,
	pictureIntro: 'The essence in one picture:',
	image: 'lan/en/img/bad-good.png',
	imageAlt: 'Bad: asking “What is polymorphism?” in a chat. Good: typing the same question into Google, and the answer is right there on the results page.',
	imageTitle: "The son came to his father and asked: 'Why should I Google?'",
	footer: 'Inspiration - stupid questions from different chats that need to be googled... Link to',
	github: 'GitHub',
	ui: {
		languages: 'Language',
		darkTheme: 'Dark theme',
		// Shown on the other translations to readers whose browser prefers this language.
		suggest: 'Read this page in English',
		close: 'Close',
		// Under the example questions when the page was opened from a link with ?q=.
		findAnswer: 'Find the answer on Google',
		// Read out after a link that opens a new tab.
		newTab: 'opens in a new tab',
		// The form that makes such links.
		shareTitle: 'Send this page to whoever asked',
		shareQuestion: 'The question you were asked (optional)',
		shareHint: 'It will appear on the page, with a button that searches for the answer.',
		shareLanguage: 'Page language',
		shareLink: 'Link',
		copy: 'Copy',
		share: 'Share',
		copied: 'Link copied.',
		copyFailed: "Couldn't copy. Select the link and copy it yourself.",
		// 404.html, which shows all five languages.
		notFound: 'Page not found',
		notFoundText: "There is no such page, and even Google can't help with this one.",
		notFoundHome: 'Go to the main page',
	},
};
