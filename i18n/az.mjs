export default {
	lang: 'az',
	dir: 'lan/az/',
	name: 'Azərbaycanca',
	title: 'Xahiş edirik, Google-dan istifadə etməyi öyrənin!',
	description: 'Bu məqalə Google-dan istifadə etmək bacarığına, və onun vacibliyinə həsr olunub.',
	intro: 'Söhbətlərdə/forumlarda bu tipli suallar verməyin:',
	questions: ['Varislik nə üçün lazım?', 'Səma niyə göydür?', 'Polimorfizm nədir?'],
	// The crossed-out word is hidden from screen readers, which would read it as if it still stood.
	verdict: 'Belə sualları Google vasitəsi ilə axtarmaq <s aria-hidden="true">olar</s> <b>lazımdır!</b>',
	body: `
<p><b>Google-dan istifadə etmək</b> bu deməkdir:</p>
<ol>
	<li><a target="_blank" rel="noopener noreferrer" href="https://google.com">Google</a> (və ya başqa axtarış sistemini) açmaq</li>
	<li>Öz sualınızı daxil etmək.</li>
</ol>
<p class="quote"> - Başa düşürəm, amma niyə belə sualları söhbətlərdə/forumlarda verməyim?</p>
<p> - İnanın, Sizin suallarınızın 99% kimsə çoxdan cürbəcür saytlarda, forumlarda verib. Bu deməkdir ki cavabları internetdə var. Ona görə, öz sualınızı Google (vəya digər axtarış sisteminə) verməklə, Siz cavabınızı daha tez alacaqsınız, habelə, başqa adamları narahat etməyəcəksiniz.</p>
<p class="quote"> - Demək istəyirsiniz ki sualları söhbətlərdə/forumlarda vermək səhvdir/tərbiyəsizlikdir/pisdir?</p>
<p>- Tamamilə yox. Əgər sizin sualınız varsa, onu birinci Google-da axtarın, və cavabını tapmadığınız halda, <s><a target="_blank" rel="noopener noreferrer" href="https://yandex.com">Yandex</a>-də axtarın</s> söhbətlərdə/forumlarda soruşun.</p>
`,
	pictureIntro: 'İşin mahiyyəti bir şəkildə:',
	image: 'lan/az/img/bad-good.png',
	imageAlt: 'Pis: söhbətdə «Polimorfizm nədir?» deyə soruşmaq. Yaxşı: eyni sualı Google-da axtarmaq, cavab elə nəticələr səhifəsindədir.',
	imageTitle: "Oğul atasına gəlib soruşdu: 'niyə Google-dan istifadə edim ki?'",
	footer: 'Məqalənin ilhamı - cürbəcür söhbətlərdə mənasız suallar, hansı ki Google-da tapıla bilər...',
	github: 'Github linki',
	ui: {
		languages: 'Dil',
		darkTheme: 'Tünd tema',
		// Shown on the other translations to readers whose browser prefers this language.
		suggest: 'Bu səhifəni Azərbaycan dilində oxuyun',
		close: 'Bağla',
		// Under the example questions when the page was opened from a link with ?q=.
		findAnswer: 'Cavabı Google-da axtarın',
		// The form that makes such links.
		shareTitle: 'Bu səhifəni sual verənə göndərin',
		shareQuestion: 'Sizə verilən sual (istəyə bağlı)',
		shareHint: 'Sual səhifədə görünəcək, yanında da cavabı axtaran düymə olacaq.',
		shareLanguage: 'Səhifənin dili',
		shareLink: 'Keçid',
		copy: 'Kopyala',
		share: 'Paylaş',
		copied: 'Keçid kopyalandı.',
		copyFailed: 'Kopyalamaq alınmadı. Keçidi seçin və özünüz kopyalayın.',
		// 404.html, which shows all five languages.
		notFound: 'Səhifə tapılmadı',
		notFoundText: 'Belə səhifə yoxdur, burada hətta Google da kömək etməz.',
		notFoundHome: 'Ana səhifəyə',
	},
};
