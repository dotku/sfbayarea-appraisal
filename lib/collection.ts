// Reference catalogue (鑒賞圖錄): public-domain museum objects, used for
// connoisseurship and teaching only. Images and facts come from The
// Metropolitan Museum of Art Open Access (CC0); we have not examined or valued
// any of them. To add one, copy the facts from the museum's object page and
// put the image in public/collection/.

export type Category = 'ceramics' | 'jade' | 'bronze' | 'painting' | 'furniture' | 'metalwork';

export const CATEGORIES: Category[] = ['ceramics', 'jade', 'bronze', 'painting', 'furniture', 'metalwork'];

type L = { zh: string; en: string };

export interface CollectionItem {
  id: string;
  category: Category;
  image: string;
  title: L;
  era: L;
  material: L;
  size: L;
  /** What an appraiser typically looks at for this kind of object. */
  points: { zh: string[]; en: string[] };
  source: { name: L; url: string; accession: string };
}

const MET: L = { zh: '大都會藝術博物館', en: 'The Metropolitan Museum of Art' };

export const COLLECTION: CollectionItem[] = [
  {
    id: 'xuande-dragon-jar',
    category: 'ceramics',
    image: '/collection/met-39666.jpg',
    title: { zh: '明宣德 青花龍紋罐', en: 'Jar with dragon, Xuande mark and period' },
    era: { zh: '明宣德（1426–1435）', en: 'Ming dynasty, Xuande period (1426–35)' },
    material: { zh: '瓷，釉下鈷藍彩繪', en: 'Porcelain, cobalt blue under clear glaze' },
    size: { zh: '高 48.3 cm，徑 48.3 cm', en: 'H. 48.3 cm, Diam. 48.3 cm' },
    points: {
      zh: [
        '發色：宣德青花用進口鈷料，濃處有黑褐色結晶斑，筆觸邊緣有暈散',
        '胎釉：釉面常見細小橘皮紋，底足露胎處多有火石紅',
        '款識：對照同期官窯款的字體、排列與青料，後仿款常顯得工整拘謹',
      ],
      en: [
        'Colour: imported cobalt shows dark iron spots where it pools, with soft blurring at the brush edges',
        'Body and glaze: a fine orange-peel surface; the exposed foot often fires to a reddish tone',
        'Reign mark: compare the calligraphy, layout and cobalt with documented imperial marks of the period',
      ],
    },
    source: { name: MET, url: 'https://www.metmuseum.org/art/collection/search/39666', accession: '37.191.1' },
  },
  {
    id: 'longquan-bottle',
    category: 'ceramics',
    image: '/collection/met-51050.jpg',
    title: { zh: '南宋 龍泉窯青釉瓶', en: 'Bottle vase, Longquan ware' },
    era: { zh: '南宋（13 世紀）', en: 'Southern Song dynasty, 13th century' },
    material: { zh: '炻器，青釉；口沿有金漆修補', en: 'Stoneware with celadon glaze; gold lacquer repairs' },
    size: { zh: '高 14.6 cm，徑 8.3 cm', en: 'H. 14.6 cm, Diam. 8.3 cm' },
    points: {
      zh: [
        '釉色：南宋龍泉以粉青、梅子青為上，多次施釉，釉層肥厚、乳濁',
        '露胎：足底露胎處多呈朱紅色',
        '修補：本件口沿以金漆修補。修復必須在報告中如實記錄，它會影響市場價值',
      ],
      en: [
        'Glaze: the best Southern Song Longquan is a thick, opaque bluish or plum green built up in several coats',
        'Foot: exposed body usually fires to a cinnabar red',
        'Repairs: this rim was mended with gold lacquer. Any restoration must be disclosed in the report; it affects value',
      ],
    },
    source: { name: MET, url: 'https://www.metmuseum.org/art/collection/search/51050', accession: '34.113.13' },
  },
  {
    id: 'jun-bowl',
    category: 'ceramics',
    image: '/collection/met-42465.jpg',
    title: { zh: '北宋 鈞窯天藍釉碗', en: 'Bowl, Jun ware' },
    era: { zh: '北宋（12 世紀上半葉）', en: 'Northern Song dynasty, first half of the 12th century' },
    material: { zh: '炻器，天藍釉', en: 'Stoneware with blue glaze' },
    size: { zh: '徑 10.5 cm', en: 'Diam. 10.5 cm' },
    points: {
      zh: [
        '釉面：乳濁的天藍、月白釉，口沿釉薄處透出胎色',
        '特徵：鈞釉常見「蚯蚓走泥紋」，成因是生釉乾燥時開裂、高溫熔融後流入裂隙；多見於陳設類鈞瓷',
        '區分：注意與明清「宜鈞」「爐鈞」等仿鈞產品分開',
      ],
      en: [
        'Glaze: opalescent sky-blue or moon-white, thinning at the rim to show the body',
        'Tell-tale marks: "earthworm tracks", formed when the raw glaze cracked on drying and the melt flowed into the cracks in firing; most common on display wares',
        'Separate genuine Song Jun from later Yixing and Lujun imitations of the Ming and Qing',
      ],
    },
    source: { name: MET, url: 'https://www.metmuseum.org/art/collection/search/42465', accession: '20.45' },
  },
  {
    id: 'qianlong-famille-rose-jar',
    category: 'ceramics',
    image: '/collection/met-42207.jpg',
    title: { zh: '清乾隆 粉彩花籃紋蓋罐', en: 'Jar with basket of auspicious flowers' },
    era: { zh: '清乾隆（1736–1795）', en: 'Qing dynasty, Qianlong period (1736–95)' },
    material: { zh: '瓷，釉上粉彩', en: 'Porcelain painted with overglaze enamels' },
    size: { zh: '高 61 cm', en: 'H. 61 cm' },
    points: {
      zh: [
        '彩料：粉彩以玻璃白打底，色階柔和，有立體感',
        '畫工：乾隆時期精品構圖繁密、勾線細勁；有無年款、官窯或民窯（含外銷瓷）要分開判斷',
        '仿品：晚清民國仿品彩色浮豔，畫意呆板，可由此區分',
      ],
      en: [
        'Enamels: famille rose colours sit on a white base, giving soft gradations and depth',
        'Painting: fine Qianlong wares show dense compositions and confident outlines; imperial, private-kiln and export wares must be judged separately',
        'Later copies (late Qing, Republic) tend toward harsh colours and stiff drawing',
      ],
    },
    source: { name: MET, url: 'https://www.metmuseum.org/art/collection/search/42207', accession: '14.40.189a, b' },
  },
  {
    id: 'qing-jade-box',
    category: 'jade',
    image: '/collection/met-42129.jpg',
    title: { zh: '清 玉盒', en: 'Box' },
    era: { zh: '清（18 世紀）', en: 'Qing dynasty, 18th century' },
    material: { zh: '軟玉', en: 'Jade (nephrite)' },
    size: { zh: '高 2.5 cm，寬 6 cm，長 5.1 cm', en: 'H. 2.5 cm, W. 6 cm, L. 5.1 cm' },
    points: {
      zh: [
        '玉質：看油潤度、結構與透光下的質地；產地（和田或其他產地軟玉）憑肉眼難以確定，需結合儀器檢測，且結論常有保留',
        '做工：清代玉盒講究子母口嚴密、打磨細緻',
        '沁色：天然沁由表及裡、過渡自然；人工做舊的顏色多浮在表面',
      ],
      en: [
        'Material: judge lustre, texture and structure under transmitted light; geographic origin (Hetian or elsewhere) cannot be settled by eye and needs lab testing',
        'Workmanship: Qing boxes should have tight-fitting lids and fine polishing',
        'Alteration: natural staining penetrates gradually; artificial ageing tends to sit on the surface',
      ],
    },
    source: { name: MET, url: 'https://www.metmuseum.org/art/collection/search/42129', accession: '04.6.10a, b' },
  },
  {
    id: 'zhou-dragon-ring',
    category: 'jade',
    image: '/collection/met-39637.jpg',
    title: { zh: '東周 繩紋龍首玉環', en: 'Knotted dragon ring' },
    era: { zh: '東周（西元前 3 世紀）', en: 'Eastern Zhou dynasty, 3rd century BCE' },
    material: { zh: '軟玉', en: 'Jade (nephrite)' },
    size: { zh: '高 7.9 cm，寬 5.2 cm', en: 'H. 7.9 cm, W. 5.2 cm' },
    points: {
      zh: [
        '工痕：在放大鏡下看砣具留下的陰線起止與「跳刀」痕',
        '紋飾：絞絲、繩紋與龍首造型是否符合戰國風格',
        '高古玉：仿品很多，結論應結合工痕、沁色與出處記錄綜合判斷',
      ],
      en: [
        'Tool marks: under magnification, look at how incised lines start and stop and at skipped cuts left by the wheel',
        'Style: check that the rope twist and dragon head match Warring States conventions',
        'Archaic jade is widely copied; weigh tool marks, alteration and provenance together',
      ],
    },
    source: { name: MET, url: 'https://www.metmuseum.org/art/collection/search/39637', accession: '1985.214.99' },
  },
  {
    id: 'ritual-altar-set',
    category: 'bronze',
    image: '/collection/met-76974.jpg',
    title: { zh: '商末周初 青銅禁與酒器一組', en: 'Ritual altar set' },
    era: { zh: '商末至西周早期（西元前 11 世紀晚期）', en: 'Shang–Western Zhou dynasty, late 11th century BCE' },
    material: { zh: '青銅', en: 'Bronze' },
    size: { zh: '禁：高 18.1 cm，寬 46.4 cm，長 89.9 cm', en: 'Table: H. 18.1 cm, W. 46.4 cm, D. 89.9 cm' },
    points: {
      zh: [
        '鏽色：自然鏽層次分明、由內而外結晶，粘附或塗刷的假鏽較浮',
        '鑄造：看範線、墊片與鑄銘的位置，判斷是否符合時代工藝',
        '出處：青銅器的來源記錄（出土與出境時間）關係到能否合法交易，必須核實',
      ],
      en: [
        'Patina: natural corrosion builds up in distinct layers; applied or painted patina sits on top',
        'Casting: mould seams, spacers and cast inscriptions should match the period technique',
        'Provenance: when and how a bronze left its country of origin decides whether it can be sold legally',
      ],
    },
    source: { name: MET, url: 'https://www.metmuseum.org/art/collection/search/76974', accession: '24.72.1–.14' },
  },
  {
    id: 'ni-zan-mount-yu',
    category: 'painting',
    image: '/collection/met-45636.jpg',
    title: { zh: '元 倪瓚《虞山林壑圖》', en: 'Ni Zan, Woods and Valleys of Mount Yu' },
    era: { zh: '元（1372 年）', en: 'Yuan dynasty, dated 1372' },
    material: { zh: '立軸，紙本水墨', en: 'Hanging scroll; ink on paper' },
    size: { zh: '畫心 94.6 × 35.9 cm', en: 'Image: 94.6 × 35.9 cm' },
    points: {
      zh: [
        '筆墨：倪瓚以折帶皴、疏林遠岫著稱，用筆乾淡簡逸',
        '題跋印章：核對畫家自題、後人題跋與鑒藏印，並查歷代著錄',
        '紙絹：材質與裝裱年代要與作品年代吻合；倪瓚名下偽作極多',
      ],
      en: [
        'Brushwork: Ni Zan is known for "folded-ribbon" texture strokes, sparse trees and dry, pale ink',
        'Inscriptions and seals: check the artist\'s inscription, later colophons, collectors\' seals and catalogue records',
        'Paper and mounting must fit the date; works attributed to Ni Zan are very often forged',
      ],
    },
    source: { name: MET, url: 'https://www.metmuseum.org/art/collection/search/45636', accession: '1973.120.8' },
  },
  {
    id: 'huang-tingjian-scroll',
    category: 'painting',
    image: '/collection/met-39918.jpg',
    title: { zh: '北宋 黃庭堅《廉頗藺相如列傳》', en: 'Huang Tingjian, Biographies of Lian Po and Lin Xiangru' },
    era: { zh: '北宋（約 1095 年）', en: 'Northern Song dynasty, ca. 1095' },
    material: { zh: '手卷，紙本草書', en: 'Handscroll; ink on paper' },
    size: { zh: '本幅 33.7 × 1840.2 cm', en: 'Image: 33.7 × 1840.2 cm' },
    points: {
      zh: [
        '書風：比對可靠真跡的筆勢、結字與行氣',
        '流傳：題跋、鑒藏印與著錄能還原遞藏經過',
        '材料：紙張、墨色與裝裱的年代',
      ],
      en: [
        'Style: compare stroke movement, character structure and rhythm with secure works',
        'History: colophons, seals and catalogue entries trace the chain of ownership',
        'Materials: the age of the paper, ink and mounting',
      ],
    },
    source: { name: MET, url: 'https://www.metmuseum.org/art/collection/search/39918', accession: '1989.363.4' },
  },
  {
    id: 'huanghuali-armchair',
    category: 'furniture',
    image: '/collection/met-39493.jpg',
    title: { zh: '明末清初 黃花梨四出頭官帽椅', en: 'Yokeback armchair' },
    era: { zh: '明末清初（17 世紀）', en: 'Late Ming–early Qing dynasty, 17th century' },
    material: { zh: '黃花梨（降香黃檀）', en: 'Wood (huanghuali, Dalbergia odorifera)' },
    size: { zh: '高 121.9 cm，寬 58.4 cm，深 47.6 cm', en: 'H. 121.9 cm, W. 58.4 cm, D. 47.6 cm' },
    points: {
      zh: [
        '木材：海南黃花梨紋理多「鬼臉」，新切面有降香味；注意與越南黃花梨、花梨木區分',
        '結構：看榫卯做法與磨損位置是否合理，有無後配部件',
        '包漿：老傢俱的包漿溫潤、有使用痕跡，打蠟做舊的光澤較新',
      ],
      en: [
        'Wood: Hainan huanghuali shows "ghost face" figure and a fragrant fresh cut; separate it from Vietnamese and other rosewoods',
        'Construction: joinery and wear should make sense together; look for replaced parts',
        'Surface: old patina is soft and shows real use; waxed-on ageing looks newer',
      ],
    },
    source: { name: MET, url: 'https://www.metmuseum.org/art/collection/search/39493', accession: '1997.92' },
  },
  {
    id: 'cloisonne-table-screen',
    category: 'metalwork',
    image: '/collection/met-856282.jpg',
    title: { zh: '明 掐絲琺瑯山水插屏', en: 'Table screen with landscape' },
    era: { zh: '明（15 世紀下半葉）', en: 'Ming dynasty, second half of the 15th century' },
    material: { zh: '銅胎掐絲琺瑯，木框座', en: 'Cloisonné enamel on copper alloy; wood frame and stand' },
    size: { zh: '高 49.2 cm，寬 48.6 cm', en: 'H. 49.2 cm, W. 48.6 cm' },
    points: {
      zh: [
        '胎與絲：明代銅胎厚重，掐絲不如清代勻整',
        '釉料：琺瑯常見砂眼，色彩沉著',
        '鎏金：清代仿明與現代仿品的鎏金、釉色往往較新亮，現代電鍍金色澤浮薄',
      ],
      en: [
        'Body and wires: Ming copper bodies are heavy and the wirework is less even than in the Qing',
        'Enamel: pitting is common and colours are deep',
        'Gilding: Qing imitations of Ming work and modern copies tend to have brighter, newer gilding and enamels; modern electroplating looks thin',
      ],
    },
    source: { name: MET, url: 'https://www.metmuseum.org/art/collection/search/856282', accession: '2022.10a, b' },
  },
  {
    id: 'ming-gold-hairpin',
    category: 'metalwork',
    image: '/collection/met-60860.jpg',
    title: { zh: '明 金簪', en: 'Hairpin' },
    era: { zh: '明（1368–1644）', en: 'Ming dynasty (1368–1644)' },
    material: { zh: '金', en: 'Gold' },
    size: { zh: '長 10.8 cm', en: 'L. 10.8 cm' },
    points: {
      zh: [
        '成色：可用 X 射線螢光（XRF）無損檢測，但只反映表面成分，表層富集或鍍金會使讀數偏高',
        '工藝：看錘揲、鏨刻、累絲等做法是否符合時代',
        '磨損：凸起處應有自然磨損，鑄造仿品細節較模糊',
      ],
      en: [
        'Fineness: X-ray fluorescence (XRF) tests gold content non-destructively but reads only the surface; surface enrichment or plating can inflate it',
        'Technique: repoussé, chasing and filigree should match the period',
        'Wear: raised areas should be naturally worn; cast copies lose fine detail',
      ],
    },
    source: { name: MET, url: 'https://www.metmuseum.org/art/collection/search/60860', accession: '26.202.3' },
  },
];
