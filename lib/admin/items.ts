// Shared labels and types for the collection registry (藏品登記).

export const CATEGORY_LABEL = {
  ceramics: '陶瓷',
  jade: '玉器',
  painting: '书画',
  bronze: '青铜',
  furniture: '家具木器',
  metalwork: '金属工艺',
  scholar: '文房杂项',
  other: '其他',
} as const;

export const SOURCE_LABEL = {
  consignment: '委托',
  estate: '遗产清理',
  fair: '古董集市',
  auction: '拍卖购入',
  dealer: '古董商',
  other: '其他',
} as const;

// Order is the pipeline order.
export const STATUS_LABEL = {
  intake: '待登记完善',
  appraising: '估价中',
  consigned: '已签委托',
  photographed: '已拍图录照',
  listed: '已上拍',
  sold: '已成交',
  unsold: '流拍',
  returned: '已退还',
} as const;

export type Category = keyof typeof CATEGORY_LABEL;
export type Source = keyof typeof SOURCE_LABEL;
export type Status = keyof typeof STATUS_LABEL;

export interface Consignor {
  id: string;
  name: string;
  phone: string;
  email: string;
  wechat: string;
  city: string;
  notes: string;
  created_at: string;
}

export interface Item {
  id: string;
  item_no: string;
  title: string;
  category: Category;
  era: string;
  material: string;
  dimensions: string;
  weight: string;
  marks: string;
  condition: string;
  provenance: string;
  source_channel: Source;
  consignor_id: string | null;
  acquired_on: string | null;
  estimate_low: number | null;
  estimate_high: number | null;
  reserve: number | null;
  has_ivory_rhino: boolean;
  is_archaeological: boolean;
  has_regulated_wood: boolean;
  provenance_documented: boolean;
  status: Status;
  location: string;
  notes: string;
  images: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

/** Why an item may not be listed for sale yet; empty when it can. */
export function complianceBlocks(i: Pick<Item, 'has_ivory_rhino' | 'is_archaeological' | 'has_regulated_wood' | 'provenance_documented'>) {
  const out: string[] = [];
  if (i.has_ivory_rhino) out.push('含象牙或犀角：加州禁止买卖，不能上拍');
  if (i.is_archaeological && !i.provenance_documented) out.push('疑似出土文物：需有合法出境 / 来源证明才能上拍');
  if (i.has_regulated_wood && !i.provenance_documented) out.push('受管制木材（如黄花梨、紫檀）：需备齐来源文件');
  return out;
}

export const usd = (n: number | null) => (n == null ? '' : `$${n.toLocaleString('en-US')}`);
