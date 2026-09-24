import type { ProjectData, SiteSettingsData, SocialLinkData } from "./types";

/**
 * Built-in fallback content. The public site renders this whenever the database
 * is empty or unreachable, so the site always looks finished - even before a
 * database is connected or the admin has added real content/media.
 * Everything here is editable later from /admin900.
 *
 * Copy uses lightweight markup rendered by <RichText>:
 *   **word** -> accent highlight   |   *word* -> bright emphasis
 */

const placeholder = (seed: string) => `https://picsum.photos/seed/${seed}/1280/720`;

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  heroTitle: "DANI",
  heroSubtitle:
    "VJ & визуален artist. Създавам **визуализации за живи концерти** и събития — всеки проект се гради около *историята на изпълнителя*, от **3D сцени** до **генеративни лууп анимации**.",
  heroCtaLabel: "Explore Work",
  contactIntro:
    "За **booking**, **колаборации** или въпроси около проект — пишете ми директно през формата или в социалните мрежи.",
  contactEmail: "booking@example.com",
  contactPhone: "+359 88 000 0000",
  seoTitle: "Dani — VJ Portfolio | Визуализации за живи събития",
  seoDescription:
    "Портфолио на VJ Dani — визуализации за концерти на живо, 3D сцени и генеративни анимации за Balkan Madness x Balkan Queens и други събития.",
  ogImageUrl: placeholder("og-cover"),
};

export const DEFAULT_SOCIAL_LINKS: SocialLinkData[] = [
  { id: "instagram", platform: "Instagram", url: "https://instagram.com", iconKey: "instagram", order: 0, visible: true },
  { id: "tiktok", platform: "TikTok", url: "https://tiktok.com", iconKey: "tiktok", order: 1, visible: true },
  { id: "youtube", platform: "YouTube", url: "https://youtube.com", iconKey: "youtube", order: 2, visible: true },
  { id: "facebook", platform: "Facebook", url: "https://facebook.com", iconKey: "facebook", order: 3, visible: true },
];

export const DEFAULT_PROJECTS: ProjectData[] = [
  {
    id: "balkan-nextalgia",
    slug: "balkan-nextalgia",
    title: "Balkan Nextalgia",
    subtitle: "Balkan Madness x Balkan Queens",
    category: "MAIN",
    order: 0,
    eventDate: "17 май 2025",
    location: "Ефенар, Айндховен, Нидерландия",
    accentColor: "#c026d3",
    summary:
      "**Първият** колаборативен концерт между **Balkan Madness** и **Balkan Queens** — *трима* български изпълнители от различни ери и *трима* диджеи, събрани за пръв път на една сцена в чужбина.",
    fullDescription:
      "**Balkan Nextalgia** е първият колаборативен концерт между **Balkan Madness** и **Balkan Queens**. За пръв път на една сцена в чужбина събрахме *трима* български изпълнители от различни ери и *трима* диджеи — **DJ 359**, **DJ Headbunny** и **DJ Zander**. Събитието се проведе на *17 май 2025* в **Айндховен, Нидерландия**, в концертната зала **Ефенар**.\n\nКонцепцията беше *„Старото / Y2K срещу Новото“*. За целта поканихме **Андреа** — една от най-популярните поп-фолк изпълнителки от *Y2K ерата* (началото на 2000-те), както и **Биляниш** и **Джия**, представители на новото поколение от два различни жанра: рап и поп-фолк.\n\nЗа концерта изработих *4 визуализации* — по една за всяка певица и четвърта главна, докато диджеите пускат музика. Визуализациите следват общ шаблон, чиято концепция е съобразена с всеки изпълнител, а всяко видео проследява визията на постера за събитието.",
    posterImageUrl: placeholder("balkan-nextalgia-poster"),
    fullVideoUrl: "",
    published: true,
    sections: [
      {
        id: "bn-main",
        title: "Основна визия",
        subtitle: "4 мин продължителност",
        colors: "Розово, Лилаво, Синьо, Черно и Бяло",
        theme: "Y2K x Liquid Metal x Futuristic Luxury-Tech",
        content:
          "Обединява темите на трите певици — *Y2K* (**Андреа**), *Liquid Metal* (**Биляниш**) и *Futuristic Luxury-Tech* (**Джия**). Включени са всички цветове и елементи от основния постер, с отделна сцена за всяка тема.\n\n**Начална сцена с екрани** — кадри от участия на изпълнителите и от предишни събития, за да могат хората да се разпознаят в тях.\n\n**Сцена с кола** (4iraka Tag) — препратка към видеото на Андреа „Подлудяваш ме“.\n\n**Сцена с Ефенар** — 3D модел на концертната зала: камерата се приближава до портал, който се отключва, а обстановката вътре е сюрреалистична и неонова — зрителят усеща, че пристига физически на събитието.\n\n**Лууп сцена #1** — тунел (връзка с Андреа, Y2K, MP3 плеър, пеперуди, хромирани елементи).\n**Лууп сцена #2** — копринени елементи (връзка с Джия и модерните нощни клубове).\n**Лууп сцена #3** — Liquid Metal тунел в черно-бяло (връзка с Биляниш, Dark Rap / Trap).\n\nЛууп сцените се редуват на *всяка минута*, за да не са натрапчиви по време на събитието.",
        videoUrl: "",
        order: 0,
      },
      {
        id: "bn-andrea",
        title: "Андреа",
        subtitle: "1 мин",
        colors: "Тъмно розово, Лилаво, Бяло, Черно",
        theme: "Ретро поп-фолк, Y2K, парти културата на 2000-те",
        content:
          "Шрифт: **Akira**. В главната визия около **Андреа** има 3D елементи като *Нокиа с копчета*, *лазерен диск* и *пеперуда* — препратка към *Y2K ерата*.\n\n**Transitions** на всеки *10 секунди* — flash с изскачащи ретро елементи (прозорци и иконки от стара операционна система) в ярки Y2K цветове. Grain ефект подчертава ретрото, а *MP3 плеър* насочва към идеята за стари хитове.",
        videoUrl: "",
        order: 1,
      },
      {
        id: "bn-bilyanish",
        title: "Биляниш",
        subtitle: "1 мин",
        colors: "Черно и Бяло, Лилаво",
        theme: "Dark Rap/Trap, Liquid Metal",
        content:
          "Шрифт: **Akira**. *Liquid Metal* се свързва както с Y2K, така и с високия паричен статус в рап културата. В главната визия около **Биляниш** има Liquid Metal елементи в черно и бяло.\n\n**Transitions** на всеки *10 секунди* — лек flash и glitch (връзка с рап клипове), за да не отместват фокуса от пърформънса. Liquid Metal бекграунд в черно-бяло с контрастиращ текст „Bilyanish“.",
        videoUrl: "",
        order: 2,
      },
      {
        id: "bn-jiya",
        title: "Джия",
        subtitle: "1 мин",
        colors: "Черно и Бяло, Синьо",
        theme: "Futuristic Luxury-Tech",
        content:
          "Свързва се с визията на луксозни клубове и модерното време. В главната визия около **Джия** има 3D елементи със силен бял блясък (*highlights*).\n\n**Transitions** — акцентът е върху *3D camera movement* вместо flash, за повече връзка с minimalistic и luxury темата. 3D елемент — *въртящ се бляскав глобус*, препратка към диско топката от главния постер и към „новото поколение“.",
        videoUrl: "",
        order: 3,
      },
    ],
    media: [
      { id: "bn-m1", type: "VIDEO", placement: "PREVIEW", url: "", caption: "Основна визия — тийзър", order: 0 },
      { id: "bn-m2", type: "IMAGE", placement: "PREVIEW", url: placeholder("bn-1"), caption: "Кадър от визуализацията", order: 1 },
      { id: "bn-m3", type: "IMAGE", placement: "PREVIEW", url: placeholder("bn-2"), caption: "Кадър от визуализацията", order: 2 },
      { id: "bn-m4", type: "IMAGE", placement: "PREVIEW", url: placeholder("bn-3"), caption: "Кадър от визуализацията", order: 3 },
      { id: "bn-g1", type: "IMAGE", placement: "GALLERY", url: placeholder("bn-concept-1"), caption: "Concept art", order: 4 },
      { id: "bn-g2", type: "IMAGE", placement: "GALLERY", url: placeholder("bn-concept-2"), caption: "Скица", order: 5 },
      { id: "bn-g3", type: "IMAGE", placement: "GALLERY", url: placeholder("bn-bts-1"), caption: "Behind the scenes", order: 6 },
    ],
  },
  {
    id: "project-alpha",
    slug: "project-alpha",
    title: "Project Alpha",
    subtitle: "Balkan Madness x Balkan Queens",
    category: "MAIN",
    order: 1,
    eventDate: "14 ноември 2025",
    location: "Ефенар, Айндховен, Нидерландия",
    accentColor: "#f97316",
    summary:
      "**Balkan Madness** и **Balkan Queens** се завръщат за втори път — **Десита** на живо, плюс *трима* диджеи: **DJ 359**, **DJ Headbunny** и **Daskata**, единият с електрическа китара на сцената.",
    fullDescription:
      "**Project Alpha** е вторият колаборативен концерт между **Balkan Madness** и **Balkan Queens**. Като изпълнител на живо поканихме **Десита**, заедно с *трима* диджеи — **DJ 359**, **DJ Headbunny** и **Daskata**. Събитието се проведе на *14 ноември 2025* в **Айндховен, Нидерландия**, в концертната зала **Ефенар**.\n\nЗаглавието *„Project Alpha“* е избрано по *две* причини. Първата идва от „Project“ и препратката към филма „Project X“ — заложихме на *партито* с трима диджеи с различен стил, единият от които (**Daskata**) придружи сета си с живо изпълнение на *електрическа китара*. Втората идва от „Alpha“ — акцентът на вечерта е **Десита** от „Алфа Мюзик“.\n\nЗа концерта изработих *4 визуализации* — една за пърформънса на Десита и по една за всеки диджей. Всяка съдържа основна част (*1 мин*) плюс доработка за съответния изпълнител (*2 мин лууп*).",
    posterImageUrl: placeholder("project-alpha-poster"),
    fullVideoUrl: "",
    published: true,
    sections: [
      {
        id: "pa-main",
        title: "Основна част",
        subtitle: "1 мин продължителност",
        colors: "Оранжево, Бяло, Черно",
        theme: "Fiery Luxury Club Aesthetic",
        content:
          "Визията отразява бляскавия и провокативен образ на **Десита**; огнените елементи са взаимствани от визията ѝ в песента „Mi Amor“. Включени са всички цветове и елементи от основния постер.\n\n**Начална сцена с екрани** — кадри от съответния изпълнител на сцената.\n**Сцена с вълк #1** — вълкът представя Десита и енергията ѝ (препратка към лейбъла *Alpha Music*); завършва със зуум към *оранжевото око* на вълка.\n**Сцена с кола** (4iraka Tag) — гледната точка на зрителя, идващ на събитието, успоредно на вълка.\n**Сцена с Ефенар** — 3D модел на залата; вълкът се появява и „поглъща“ всичко, символизирайки потапянето на зрителя.\n**Сцена с вълк #2** — всичко в пламъци; кулминация с вой, свързан с tag-а на Alpha Music *„виещ вълк“*.",
        videoUrl: "",
        order: 0,
      },
      {
        id: "pa-dessita",
        title: "Десита",
        subtitle: "2 мин продължителност",
        colors: "Бяло и Черно",
        theme: "Luxury Club Aesthetic",
        content:
          "Шрифт: **Gotham**. Бяло и черно предават лъскавата визия на изпълнителката; *диаманти* на фон, присъстващи и в главния постер.\n\nИзлизането на **Десита** беше синхронизирано с интрото ѝ — тя се появи точно когато *вълкът вие*, за драматичен ефект. Лууп анимацията с текст „Dessita“ наслагва няколко слоя стокови кадри на диаманти, с бяло като основен цвят, за да приковава вниманието към сцената.",
        videoUrl: "",
        order: 1,
      },
      {
        id: "pa-dj359",
        title: "DJ 359",
        subtitle: "2 мин",
        colors: "Оранжево и Лилаво",
        theme: "Futuristic Neon Club Aesthetic",
        content:
          "Шрифт: **Gotham**. Леко апокалиптична, разрушена обстановка — кубчетата са интериорът на **Ефенар**, „погълнат“ от Десита и Project Alpha. Въртяща се камера около централен елемент акцентира върху сета на диджея.\n\n3D елемент — *детайлен модел на главата* на **DJ 359**, с разпознаваемата ѝ шапка и ръчно рисувани татуировки по дизайн *1:1*.",
        videoUrl: "",
        order: 2,
      },
      {
        id: "pa-headbunny",
        title: "DJ Headbunny",
        subtitle: "2 мин",
        colors: "Розово и Синьо",
        theme: "Futuristic Neon Club Aesthetic",
        content:
          "Шрифт: **Gotham**. Същата леко апокалиптична естетика като другите диджей визуализации, с въртяща се камера около централен елемент.\n\n3D елемент — *модел на заек* (пряка връзка със символа на **Headbunny**) и *1:1* модел на нейния DJ контролер **Roland**, заедно със слушалки — идеята, че тя контролира обстановката в Ефенар.",
        videoUrl: "",
        order: 3,
      },
      {
        id: "pa-daskata",
        title: "Daskata",
        subtitle: "2 мин",
        colors: "Оранжево и Червено",
        theme: "Futuristic Neon Club Aesthetic",
        content:
          "Шрифт: **Gotham**. Топлите цветове (особено *яркочервено*) настройват зрителя за *рок акцента* на вечерта.\n\n3D елемент — *модел на електрическа китара*, пряка връзка с живото изпълнение на **Daskata** на сцената.",
        videoUrl: "",
        order: 4,
      },
    ],
    media: [
      { id: "pa-m1", type: "VIDEO", placement: "PREVIEW", url: "", caption: "Основна визия — тийзър", order: 0 },
      { id: "pa-m2", type: "IMAGE", placement: "PREVIEW", url: placeholder("pa-1"), caption: "Кадър от визуализацията", order: 1 },
      { id: "pa-m3", type: "IMAGE", placement: "PREVIEW", url: placeholder("pa-2"), caption: "Кадър от визуализацията", order: 2 },
      { id: "pa-m4", type: "IMAGE", placement: "PREVIEW", url: placeholder("pa-3"), caption: "Кадър от визуализацията", order: 3 },
      { id: "pa-g1", type: "IMAGE", placement: "GALLERY", url: placeholder("pa-concept-1"), caption: "Concept art", order: 4 },
      { id: "pa-g2", type: "IMAGE", placement: "GALLERY", url: placeholder("pa-concept-2"), caption: "Скица", order: 5 },
      { id: "pa-g3", type: "IMAGE", placement: "GALLERY", url: placeholder("pa-bts-1"), caption: "Behind the scenes", order: 6 },
    ],
  },
  {
    id: "stariat-krisko",
    slug: "stariat-krisko",
    title: "Стария Криско",
    subtitle: "Balkan Madness x Balkan Queens",
    category: "MAIN",
    order: 2,
    eventDate: "9 май 2026",
    location: "Ефенар, Айндховен, Нидерландия",
    accentColor: "#eab308",
    summary:
      "**Третият** колаборативен концерт между **Balkan Madness** и **Balkan Queens** — заедно с едно от *най-големите имена* в българската рап и поп музика.",
    fullDescription:
      "*„Старият Криско“* е третият колаборативен концерт между **Balkan Madness** и **Balkan Queens**. Заедно с едно от *най-големите имена* в българската рап и поп музика направихме един от *най-мащабните* български концерти в Европа. Събитието се проведе на *9 май 2026* в **Айндховен, Нидерландия**, в концертната зала **Ефенар**.\n\nЗа концерта изработих визуализация, следваща изцяло визията на официалния постер. Пълните детайли по символиката и композицията предстои да бъдат добавени тук.",
    posterImageUrl: placeholder("stariat-krisko-poster"),
    fullVideoUrl: "",
    published: true,
    sections: [
      {
        id: "sk-main",
        title: "Основна визия",
        subtitle: "1 мин продължителност",
        colors: "Съобразени с постера на събитието",
        theme: "Fiery Luxury Club Aesthetic",
        content:
          "Визуализацията следва изцяло визията на *официалния постер* за събитието. Детайлна разбивка по сцени и символика предстои да бъде допълнена.",
        videoUrl: "",
        order: 0,
      },
    ],
    media: [
      { id: "sk-m1", type: "VIDEO", placement: "PREVIEW", url: "", caption: "Основна визия — тийзър", order: 0 },
      { id: "sk-m2", type: "IMAGE", placement: "PREVIEW", url: placeholder("sk-1"), caption: "Кадър от визуализацията", order: 1 },
      { id: "sk-m3", type: "IMAGE", placement: "PREVIEW", url: placeholder("sk-2"), caption: "Кадър от визуализацията", order: 2 },
      { id: "sk-m4", type: "IMAGE", placement: "PREVIEW", url: placeholder("sk-3"), caption: "Кадър от визуализацията", order: 3 },
      { id: "sk-g1", type: "IMAGE", placement: "GALLERY", url: placeholder("sk-concept-1"), caption: "Concept art", order: 4 },
      { id: "sk-g2", type: "IMAGE", placement: "GALLERY", url: placeholder("sk-bts-1"), caption: "Behind the scenes", order: 5 },
    ],
  },
  {
    id: "other-1",
    slug: "other-1",
    title: "CYBERNETIC PULSE 01",
    subtitle: "Клубна визуализация",
    category: "OTHER",
    order: 0,
    eventDate: "",
    location: "",
    accentColor: "#a855f7",
    summary: "Кратка визуализация за клубно събитие.",
    fullDescription: "",
    posterImageUrl: placeholder("other-1"),
    fullVideoUrl: "",
    published: true,
    sections: [],
    media: [{ id: "other-1-m1", type: "IMAGE", placement: "PREVIEW", url: placeholder("other-1"), caption: "", order: 0 }],
  },
  {
    id: "other-2",
    slug: "other-2",
    title: "NEURAL NETWORK LIVE",
    subtitle: "Клубна визуализация",
    category: "OTHER",
    order: 1,
    eventDate: "",
    location: "",
    accentColor: "#a855f7",
    summary: "Кратка визуализация за клубно събитие.",
    fullDescription: "",
    posterImageUrl: placeholder("other-2"),
    fullVideoUrl: "",
    published: true,
    sections: [],
    media: [{ id: "other-2-m1", type: "IMAGE", placement: "PREVIEW", url: placeholder("other-2"), caption: "", order: 0 }],
  },
  {
    id: "other-3",
    slug: "other-3",
    title: "GLITCH ARTIFACTS EP",
    subtitle: "Клубна визуализация",
    category: "OTHER",
    order: 2,
    eventDate: "",
    location: "",
    accentColor: "#a855f7",
    summary: "Кратка визуализация за клубно събитие.",
    fullDescription: "",
    posterImageUrl: placeholder("other-3"),
    fullVideoUrl: "",
    published: true,
    sections: [],
    media: [{ id: "other-3-m1", type: "IMAGE", placement: "PREVIEW", url: placeholder("other-3"), caption: "", order: 0 }],
  },
  {
    id: "skg-team02",
    slug: "skg-x-team-02-draft",
    title: "SKG x Team 02 (Draft)",
    subtitle: "Предстоящ проект",
    category: "UPCOMING",
    order: 0,
    eventDate: "Очаквайте скоро",
    location: "",
    accentColor: "#22d3ee",
    summary: "Предстоящ проект — концепцията все още се разработва.",
    fullDescription:
      "**SKG x Team 02** е предстоящ проект, който все още е в *концептуална фаза*. Тук ще намерите *визията*, *скиците* и идеите зад проекта — преди да бъде заснето каквото и да е видео съдържание. Текстът и снимките ще се допълват постепенно.",
    posterImageUrl: placeholder("skg-team02"),
    fullVideoUrl: "",
    published: true,
    sections: [],
    media: [
      { id: "skg-m1", type: "IMAGE", placement: "PREVIEW", url: placeholder("skg-1"), caption: "Концепция", order: 0 },
      { id: "skg-m2", type: "IMAGE", placement: "PREVIEW", url: placeholder("skg-2"), caption: "Концепция", order: 1 },
      { id: "skg-m3", type: "IMAGE", placement: "PREVIEW", url: placeholder("skg-3"), caption: "Концепция", order: 2 },
    ],
  },
];

export function getDefaultProjectsByCategory(category: ProjectData["category"]) {
  return DEFAULT_PROJECTS.filter((p) => p.category === category).sort((a, b) => a.order - b.order);
}
