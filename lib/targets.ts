// The eight target categories (徵集目標), ordered by Bay Area market size.
// Copy lives in messages/*.json under collecting.g.<key>; `tier` drives the badge.
// Images are illustrations only: open-licence museum objects, credited in `credit`.

type L = { zh: string; en: string };

const MET: L = { zh: '大都會藝術博物館藏（CC0）', en: 'The Metropolitan Museum of Art (CC0)' };

export const TARGETS = [
  {
    key: 'asian',
    tier: 'first',
    image: '/collection/met-39666.jpg',
    credit: { zh: `明宣德 青花龍紋罐，${MET.zh}`, en: `Jar with dragon, Ming Xuande period. ${MET.en}` },
    url: 'https://www.metmuseum.org/art/collection/search/39666',
  },
  {
    key: 'furniture',
    tier: 'first',
    image: '/collection/met-39493.jpg',
    credit: { zh: `明末清初 黃花梨四出頭官帽椅，${MET.zh}`, en: `Yokeback armchair, huanghuali, 17th century. ${MET.en}` },
    url: 'https://www.metmuseum.org/art/collection/search/39493',
  },
  {
    key: 'cards',
    tier: 'also',
    image: '/collection/targets/cards.jpg',
    credit: { zh: `T206 球員卡（Delehanty），1909–11 年，${MET.zh}`, en: `Delehanty, T206 White Border series, 1909–11. ${MET.en}` },
    url: 'https://www.metmuseum.org/art/collection/search/413239',
  },
  {
    key: 'jewelry',
    tier: 'also',
    image: '/collection/targets/jewelry.jpg',
    credit: { zh: `Tiffany & Co. 祖母綠鑽石胸針，約 1900 年，${MET.zh}`, en: `Tiffany & Co., brooch, emerald and diamonds, ca. 1900. ${MET.en}` },
    url: 'https://www.metmuseum.org/art/collection/search/1025',
  },
  {
    key: 'california',
    tier: 'also',
    image: '/collection/targets/california.jpg',
    credit: { zh: `比爾施塔特《優勝美地谷默塞德河》，1866 年，${MET.zh}`, en: `Albert Bierstadt, Merced River, Yosemite Valley, 1866. ${MET.en}` },
    url: 'https://www.metmuseum.org/art/collection/search/10150',
  },
  {
    key: 'wine',
    tier: 'interest',
    image: '/collection/targets/wine.jpg',
    credit: { zh: `吹製玻璃酒瓶，1739–80 年，${MET.zh}`, en: `Wine bottle, free-blown glass, 1739–80. ${MET.en}` },
    url: 'https://www.metmuseum.org/art/collection/search/9867',
  },
  {
    key: 'design',
    tier: 'also',
    image: '/collection/targets/design.jpg',
    credit: {
      zh: '伊姆斯夫婦 LCW 膠合板休閒椅，檀香山藝術博物館藏；照片 CC0（Wikimedia Commons）',
      en: 'Charles and Ray Eames, LCW chair, Honolulu Museum of Art; photo CC0 (Wikimedia Commons)',
    },
    url: 'https://commons.wikimedia.org/wiki/File:LCW_(Lounge_Chair_Wood)_Chair_by_Charles_and_Ray_Eames,_Honolulu_Museum_of_Art_4410.1.JPG',
  },
  {
    key: 'western',
    tier: 'also',
    image: '/collection/targets/western.jpg',
    credit: { zh: `保羅·里維爾 銀茶壺，約 1782 年，${MET.zh}`, en: `Paul Revere Jr., teapot, silver, ca. 1782. ${MET.en}` },
    url: 'https://www.metmuseum.org/art/collection/search/8381',
  },
] as const;

export const tierClass = (tier: (typeof TARGETS)[number]['tier']) =>
  tier === 'first' ? 'bg-accent text-accent-ink' : tier === 'interest' ? 'border border-gold/60 bg-card text-gold' : 'border border-line bg-card text-ink/70';
