export default {
	lang: 'ru',
	dir: '',
	name: 'Русский',
	title: 'Пожалуйста, научитесь гуглить!',
	description: 'Статья о том, что такое гуглить и почему это важно.',
	intro: 'Не задавайте в чатах/форумах вопросы формата:',
	questions: ['Зачем нужно наследование?', 'Почему небо голубое?', 'Что такое полиморфизм?'],
	// The crossed-out word is hidden from screen readers, which would read it as if it still stood.
	verdict: 'Такого рода вопросы <s aria-hidden="true">можно</s> нужно в первую очередь <b>гуглить!</b>',
	body: `
<p><b>Гуглить</b> значит:</p>
<ol>
	<li>Открыть <a target="_blank" rel="noopener noreferrer" href="https://google.com">Google</a> (или другую поисковую систему)</li>
	<li>Ввести свой запрос.</li>
</ol>
<p class="quote"> - Я понимаю, но что плохого в том, что я задаю такие вопросы в чатах/форумах?</p>
<p> - Поверьте, 99% Ваших вопросов давным давно кто-то задавал в Интернете, в форумах. Это означает, что ответ находится в Интернете. Поэтому, задав свой вопрос Google-у (или другой поисковой системе), Вы не только быстро получите ответ, но также лишний раз не будете тревожить других людей.</p>
<p class="quote"> - То есть задавать вопросы в чатах/форумах запрещено/неэтично/плохо?</p>
<p>Не совсем. Если у Вас возник вопрос, сначала прогуглите его, затем, если не нашли ответа, можете <s>поискать в <a target="_blank" rel="noopener noreferrer" href="https://yandex.com">Яндексе</a></s> задать свой вопрос в чатах/форумах.</p>
`,
	pictureIntro: 'Суть одной картинкой:',
	image: 'img/bad-good.png',
	imageAlt: 'Плохо: спросить в чате «Что такое полиморфизм?». Хорошо: ввести тот же вопрос в Google, и ответ сразу на странице результатов.',
	imageTitle: "Кроха сын пришёл к отцу, и спросила кроха: 'Почему надо гуглить?'",
	footer: 'Вдохновение — глупые вопросы из разных чатов, которые нужно гуглить... Линк на',
	github: 'Гитхаб',
	ui: {
		languages: 'Язык',
		darkTheme: 'Тёмная тема',
		// Shown on the other translations to readers whose browser prefers this language.
		suggest: 'Читать эту страницу на русском',
		close: 'Закрыть',
		// Under the example questions when the page was opened from a link with ?q=.
		findAnswer: 'Найти ответ в Google',
		// The form that makes such links.
		shareTitle: 'Отправьте эту страницу тому, кто спросил',
		shareQuestion: 'Вопрос, который вам задали (необязательно)',
		shareHint: 'Он появится на странице вместе с кнопкой, которая найдёт ответ.',
		shareLanguage: 'Язык страницы',
		shareLink: 'Ссылка',
		copy: 'Скопировать',
		copied: 'Ссылка скопирована.',
		copyFailed: 'Не получилось скопировать. Выделите ссылку и скопируйте вручную.',
		// 404.html, which shows all five languages.
		notFound: 'Страница не найдена',
		notFoundText: 'Такой страницы нет, и тут даже Google не поможет.',
		notFoundHome: 'На главную',
	},
};
