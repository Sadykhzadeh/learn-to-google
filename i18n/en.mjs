export default {
	lang: 'en',
	dir: 'lan/en/',
	name: 'English',
	title: 'Please, learn to google!',
	description: "An article about what does 'to google' mean and why it's important.",
	intro: "Don't ask questions in chats/forums like:",
	questions: ['Why do we need inheritance?', 'Why is the sky blue?', 'What is polymorphism?'],
	verdict: 'These kinds of questions you <s>can</s> should <b>google</b> first!',
	body: `
<p><b>To google</b> means:</p>
<ol>
	<li>Open <a target="_blank" rel="noopener noreferrer" href="https://google.com">Google</a> (or other search engine)</li>
	<li>Enter your request.</li>
</ol>
<p class="quote"> - I saw, but what's wrong with that I ask these questions in chats/forums?</p>
<p> - Believe me, 99% of your questions someone asked in forum a long time ago. This means that the answer is in the Internet. Therefore, asking a question to Google (or other search engine), you not only will get quick response, but also will not be disturbing other people.</p>
<p class="quote">- So, is asking questions in the chat/forums prohibited/unethical/bad?</p>
<p>Not really. If you have a question, first Google it, then if you can't find the answer, you can <s>search it in <a target="_blank" rel="noopener noreferrer" href="https://yandex.com">Yandex</a></s> ask your question in forum.</p>
`,
	pictureIntro: 'The essence in one picture:',
	image: 'lan/en/img/bad-good.png',
	imageAlt: 'Bad: asking “What is polymorphism?” in a chat. Good: typing the same question into Google, and the answer is right there on the results page.',
	imageTitle: "The son came to his father and asked: 'Why should I Google?'",
	footer: 'Inspiration - stupid questions from different chats that need to be googled... Link to',
	github: 'Github',
	ui: {
		languages: 'Language',
		darkTheme: 'Dark theme',
		// Shown on the other translations to readers whose browser prefers this language.
		suggest: 'Read this page in English',
		close: 'Close',
		// Under the example questions when the page was opened from a link with ?q=.
		findAnswer: 'Find the answer on Google',
		// The form that makes such links.
		shareTitle: 'Send this page to whoever asked',
		shareQuestion: 'The question you were asked (optional)',
		shareHint: 'It will appear on the page, with a button that searches for the answer.',
		shareLanguage: 'Page language',
		shareLink: 'Link',
		copy: 'Copy',
		copied: 'Link copied.',
		copyFailed: "Couldn't copy. Select the link and copy it yourself.",
		// 404.html, which shows all five languages.
		notFound: 'Page not found',
		notFoundText: "There is no such page, and even Google can't help with this one.",
		notFoundHome: 'Go to the main page',
	},
};
