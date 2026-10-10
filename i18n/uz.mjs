export default {
	lang: 'uz',
	dir: 'lan/uz/',
	name: "O'zbekcha",
	title: "Iltimos Googleda qidirishni o'rganing!",
	description: 'Maqola Googleda qidirish nima va bu nima uchun zarurligi haqida!',
	intro: 'Chat/forumlarda ushbu turdagi savvolarni bermang:',
	questions: ['Nega meros qoldirish kerak?', "Nima uchun osmon ko'k?", 'Polimorfizm nima?'],
	verdict: 'Bu turdagi savollarni avvalo googledan qidirishingiz <s>(mumkin)</s> <b>kerak!</b>',
	body: `
<p><b>Qanday</b> qidirish kerak:</p>
<ol>
	<li><a target="_blank" rel="noopener noreferrer" href="https://google.com">Google</a> ni (yoki boshqa qidirish tizimini oching)</li>
	<li>Savolingizni yozing.</li>
</ol>
<p class="quote"> - Tushundim, lekin chat/forumlarda bunday savollarni berishning qanday yomon tomoni bor?</p>
<p> - Ishoning, 99% savollaringizni Internetda, forumlarda kimdir uzoq vaqtdan beri so'rab kelgan. Bu shuni anglatadiki, javob Internetda. Shuning uchun, savolingizni Google-ga (yoki boshqa qidiruv tizimiga) berib, siz nafaqat tezda javob olasiz, balki boshqa odamlarni yana bir bor bezovta qilmaysiz.</p>
<p class="quote"> - Ya'ni chat/forumlarda savollar berish taqiqlangan/axloqsiz yoki yomonmi?</p>
<p>Unchalik emas. Agar sizda savol bo'lsa, avval google-da, keyin javob topa olmasangiz, chat / forumlarda savolingizni berish uchun <s><a target="_blank" rel="noopener noreferrer" href="https://yandex.uz">Yandex</a> dan qidirishingiz</s> mumkin.</p>
`,
	pictureIntro: 'Ushbu rasmdagi misol:',
	// No Uzbek screenshot exists; the page shows the Russian one.
	image: 'img/bad-good.png',
	imageAlt: "Yomon: chatda «Polimorfizm nima?» deb so'rash. Yaxshi: xuddi shu savolni Googlega yozish, javob darhol natijalar sahifasida chiqadi.",
	imageTitle: "Kichkina o'g'il otasining oldiga kelib, so'radi: 'Nega buni googledan qidirishim kerak?'",
	footer: 'Ilhom — turli xil chatlardagi ahmoqona savollarni, googledan qidirish kerak... Link',
	github: 'Githab da',
	ui: {
		languages: 'Til',
		darkTheme: 'Tungi mavzu',
		// Shown on the other translations to readers whose browser prefers this language.
		suggest: "Bu sahifani o'zbek tilida o'qing",
		close: 'Yopish',
		// Under the example questions when the page was opened from a link with ?q=.
		findAnswer: 'Javobni Googledan qidiring',
		// The form that makes such links.
		shareTitle: 'Bu sahifani savol bergan odamga yuboring',
		shareQuestion: 'Sizga berilgan savol (ixtiyoriy)',
		shareHint: "Savol sahifada javobni qidiradigan tugma bilan birga ko'rinadi.",
		shareLanguage: 'Sahifa tili',
		shareLink: 'Havola',
		copy: 'Nusxalash',
		copied: 'Havola nusxalandi.',
		copyFailed: "Nusxalab bo'lmadi. Havolani belgilab, o'zingiz nusxalang.",
	},
};
