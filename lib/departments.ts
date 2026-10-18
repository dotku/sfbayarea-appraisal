import type { Category } from '@/lib/admin/items';

// Specialist departments (modelled on a traditional auction house's department
// pages). Each groups registry categories; its page shows the public objects in
// those categories as case products. Copy lives in messages under
// departments.d.<slug>; `target` reuses the matching collecting.g.<key> text
// (what we look for / what to prepare / limits). Images are illustrations only.

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
] as const satisfies readonly { slug: string; categories: readonly Category[]; target: string; image: string; credit: L }[];

export type Department = (typeof DEPARTMENTS)[number];

export const departmentBySlug = (slug: string) => DEPARTMENTS.find((d) => d.slug === slug);
export const departmentOf = (category: Category) => DEPARTMENTS.find((d) => (d.categories as readonly Category[]).includes(category));
