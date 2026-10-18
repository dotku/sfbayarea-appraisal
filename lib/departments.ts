import type { Category } from '@/lib/admin/items';

// Specialist departments (modelled on a traditional auction house's department
// pages). Each groups registry categories; its page shows the public objects in
// those categories as case products. Copy lives in messages under
// departments.d.<slug>; `target` reuses the matching collecting.g.<key> text
// (what we look for / what to prepare / limits) — when it is null the
// department has its own what/prep/limit under departments.d.<slug>.
// `estate` departments list objects by source (estate clear-outs) instead of
// category. Images are illustrations only.

type L = { zh: string; en: string };
const MET = (zh: string, en: string): L => ({ zh: `${zh}，大都會藝術博物館藏（CC0）`, en: `${en}. The Metropolitan Museum of Art (CC0)` });

export const DEPARTMENTS = [
  {
    slug: 'asian-art',
    categories: ['ceramics', 'jade', 'bronze', 'buddhist', 'scholar', 'metalwork'],
    target: 'asian',
    image: '/collection/met-39666.jpg',
    credit: MET('明宣德 青花龍紋罐', 'Jar with dragon, Ming Xuande period'),
  },
  {
    slug: 'chinese-paintings',
    categories: ['painting'],
    target: 'asian',
    image: '/collection/met-45636.jpg',
    credit: MET('元 倪瓚《虞山林壑圖》', 'Ni Zan, Woods and Valleys of Mount Yu, 1372'),
  },
  {
    slug: 'japanese-korean-art',
    categories: ['japan_korea'],
    target: 'asian',
    image: '/collection/targets/japan.jpg',
    credit: MET('葛飾北齋《神奈川沖浪裏》', 'Katsushika Hokusai, Under the Wave off Kanagawa, ca. 1830–32'),
  },
  {
    slug: 'furniture',
    categories: ['furniture'],
    target: 'furniture',
    image: '/collection/met-39493.jpg',
    credit: MET('明末清初 黃花梨四出頭官帽椅', 'Yokeback armchair, huanghuali, 17th century'),
  },
  {
    slug: 'paintings',
    categories: ['california_art'],
    target: 'california',
    image: '/collection/targets/california.jpg',
    credit: MET('比爾施塔特《優勝美地谷默塞德河》', 'Albert Bierstadt, Merced River, Yosemite Valley, 1866'),
  },
  {
    slug: 'modern-contemporary-art',
    categories: ['modern_art'],
    target: null,
    image: '/collection/targets/modern.jpg',
    credit: MET('梵高《麥田與絲柏》', 'Vincent van Gogh, Wheat Field with Cypresses, 1889'),
  },
  {
    slug: 'jewelry-watches',
    categories: ['jewelry'],
    target: 'jewelry',
    image: '/collection/targets/jewelry.jpg',
    credit: MET('Tiffany & Co. 祖母綠鑽石胸針', 'Tiffany & Co., brooch, ca. 1900'),
  },
  {
    slug: 'trading-cards',
    categories: ['cards'],
    target: 'cards',
    image: '/collection/targets/cards.jpg',
    credit: MET('T206 球員卡（Delehanty）', 'Delehanty, T206 White Border series, 1909–11'),
  },
  {
    slug: 'coins-medals',
    categories: ['coins'],
    target: null,
    image: '/collection/targets/coins.jpg',
    credit: MET('聖高登斯 美國 20 美元金幣', 'Augustus Saint-Gaudens, United States twenty-dollar gold piece, 1907 design'),
  },
  {
    slug: '20th-century-design',
    categories: ['design'],
    target: 'design',
    image: '/collection/targets/design.jpg',
    credit: {
      zh: '伊姆斯夫婦 LCW 膠合板休閒椅，檀香山藝術博物館藏；照片 CC0（Wikimedia Commons）',
      en: 'Charles and Ray Eames, LCW chair, Honolulu Museum of Art; photo CC0 (Wikimedia Commons)',
    },
  },
  {
    slug: 'silver-decorative-arts',
    categories: ['western'],
    target: 'western',
    image: '/collection/targets/western.jpg',
    credit: MET('保羅·里維爾 銀茶壺', 'Paul Revere Jr., teapot, ca. 1782'),
  },
  {
    slug: 'european-ceramics-glass',
    categories: ['euro_ceramics'],
    target: null,
    image: '/collection/targets/euroceramics.jpg',
    credit: MET('塞弗爾瓷廠 香料瓶', 'Sèvres Manufactory, potpourri vase, 1757'),
  },
  {
    slug: 'private-collections-estates',
    categories: [],
    estate: true,
    target: null,
    image: '/collection/targets/estates.jpg',
    credit: MET('羅伯特·亞當 蘭斯當府餐廳', 'Robert Adam, dining room from Lansdowne House, 1766–69'),
  },
] as const satisfies readonly { slug: string; categories: readonly Category[]; target: string | null; estate?: boolean; image: string; credit: L }[];

export type Department = (typeof DEPARTMENTS)[number];

export const departmentBySlug = (slug: string) => DEPARTMENTS.find((d) => d.slug === slug);
export const departmentOf = (category: Category) => DEPARTMENTS.find((d) => (d.categories as readonly Category[]).includes(category));

/** Does this public object belong on the department's page? */
export const inDepartment = (d: Department, i: { category: Category; estate: boolean }) =>
  'estate' in d && d.estate ? i.estate : (d.categories as readonly Category[]).includes(i.category);
