export default {
	lang: 'uk',
	dir: 'lan/ua/',
	name: 'Українська',
	title: 'Будь ласка, навчіться ґуглити!',
	description: 'Стаття про те, що таке ґуглити і чому це важливо',
	intro: 'Не задавайте в чатах/форумах питання типу:',
	questions: ['Навіщо потрібне наслідування?', 'Чому небо синє?', 'Що таке поліморфізм?'],
	// The crossed-out word is hidden from screen readers, which would read it as if it still stood.
	verdict: 'Такі питання <s aria-hidden="true">можна</s> потрібно в першу чергу <b>ґуглити!</b>',
	body: `
<p><b>Ґуглити</b> значить:</p>
<ol>
	<li>Відкрити <a target="_blank" rel="noopener noreferrer" href="https://google.com">Google</a> (або іншу пошукову систему)</li>
	<li>Ввести запит.</li>
</ol>
<p class="quote"> - Я розумію, але що поганого в тому, що я задаю такі питання в чатах/на форумах?</p>
<p> - Повірте, 99% ваших питань давно хтось задавав в інтернеті, на форумах. Це означає, що відповідь знаходиться в інтернеті. Тому, задай своє питання ґуглу або іншій пошуковій системі ви не тільки швидко отримаєте відповідь, а й також не будете турбувати інших людей</p>
<p class="quote"> - Отже, задавати питання в чатах/форумах заборонено/неетично/погано?</p>
<p>Не зовсім. Якщо у вас виникло питання, спочатку проґугліть його, а потім, якщо ви не знайшли відповіді, можете <s>пошукати в <a target="_blank" rel="noopener noreferrer" href="https://duckduckgo.com">DuckDuckGo</a></s> задати своє питання в чатах/форумах.</p>
`,
	pictureIntro: 'Суть однією картинкою:',
	image: 'lan/ua/img/bad-good.png',
	imageAlt: 'Погано: запитати в чаті «Що таке поліморфізм?». Добре: ввести те саме питання в Google, і відповідь одразу на сторінці результатів.',
	imageTitle: "Кроха син прийшов до батька, і запитала Крихітка: 'чому треба ґуглити?'",
	footer: 'Натхнення — дурні питання з різних чатів, які потрібно ґуглити... Посилання на',
	github: 'Гітхаб',
	ui: {
		languages: 'Мова',
		darkTheme: 'Темна тема',
		// Shown on the other translations to readers whose browser prefers this language.
		suggest: 'Читати цю сторінку українською',
		close: 'Закрити',
		// Under the example questions when the page was opened from a link with ?q=.
		findAnswer: 'Знайти відповідь у Google',
		// Read out after a link that opens a new tab.
		newTab: 'відкривається в новій вкладці',
		// The form that makes such links.
		shareTitle: 'Надішліть цю сторінку тому, хто запитав',
		shareQuestion: 'Питання, яке вам поставили (необов’язково)',
		shareHint: 'Воно з’явиться на сторінці разом із кнопкою, яка знайде відповідь.',
		shareLanguage: 'Мова сторінки',
		shareLink: 'Посилання',
		copy: 'Скопіювати',
		share: 'Поділитися',
		copied: 'Посилання скопійовано.',
		copyFailed: 'Не вдалося скопіювати. Виділіть посилання і скопіюйте вручну.',
		// 404.html, which shows all five languages.
		notFound: 'Сторінку не знайдено',
		notFoundText: 'Такої сторінки немає, і тут навіть Google не допоможе.',
		notFoundHome: 'На головну',
	},
};
