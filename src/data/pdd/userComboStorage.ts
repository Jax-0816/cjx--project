import type { Combo, ComboItem } from './combos';
import { calculateCombo } from './combos';

/** localStorage 键：用户保存的预设组合（仅用户数据，不含内置模板） */
export const USER_COMBO_STORAGE_KEY = 'pdd-user-preset-combos';

/** 同页内通知列表刷新（useUserCombos 监听） */
export const USER_COMBOS_CHANGED_EVENT = 'pdd-user-combos-changed';

interface StoredUserCombo {
  id: string;
  name: string;
  description: string;
  items: ComboItem[];
  category: string;
  tags: string[];
  createdAt: string;
}

function isComboItem(x: unknown): x is ComboItem {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  return typeof o.productId === 'string' && typeof o.quantity === 'number' && o.quantity > 0;
}

function isStoredUserCombo(x: unknown): x is StoredUserCombo {
  if (typeof x !== 'object' || x === null) return false;
  const o = x as Record<string, unknown>;
  if (typeof o.id !== 'string' || typeof o.name !== 'string' || typeof o.description !== 'string') return false;
  if (typeof o.category !== 'string' || !Array.isArray(o.tags)) return false;
  if (typeof o.createdAt !== 'string') return false;
  if (!Array.isArray(o.items) || !o.items.every(isComboItem)) return false;
  return true;
}

function parseStored(): StoredUserCombo[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USER_COMBO_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isStoredUserCombo);
  } catch {
    return [];
  }
}

function writeStored(list: StoredUserCombo[]): void {
  try {
    localStorage.setItem(USER_COMBO_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to persist user combos', e);
  }
}

function notifyChanged(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(USER_COMBOS_CHANGED_EVENT));
  }
}

function storedToCombo(s: StoredUserCombo): Combo {
  const { totalCost, suggestedPrice, profit, profitMargin } = calculateCombo(s.items);
  return {
    ...s,
    totalCost,
    suggestedPrice,
    profit,
    profitMargin,
  };
}

/** 从 localStorage 读取用户预设并带上实时计算的价格字段 */
export function readUserCombos(): Combo[] {
  return parseStored().map(storedToCombo);
}

/** 与历史代码兼容：预设组合 = 仅用户保存 */
export function getPresetCombos(): Combo[] {
  return readUserCombos();
}

export function addUserCombo(input: {
  name: string;
  description: string;
  items: ComboItem[];
  category?: string;
  tags?: string[];
}): Combo {
  const list = parseStored();
  const id =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? `uc-${crypto.randomUUID()}`
      : `uc-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const createdAt = new Date().toISOString();
  const entry: StoredUserCombo = {
    id,
    name: input.name.trim() || '未命名组合',
    description: input.description.trim(),
    items: input.items,
    category: (input.category?.trim() || '自定义') || '自定义',
    tags: input.tags && input.tags.length > 0 ? input.tags : ['自定义'],
    createdAt,
  };
  list.push(entry);
  writeStored(list);
  notifyChanged();
  return storedToCombo(entry);
}

export function updateUserCombo(
  id: string,
  input: {
    name: string;
    description: string;
    items: ComboItem[];
    category?: string;
    tags?: string[];
  }
): Combo | null {
  const list = parseStored();
  const i = list.findIndex((c) => c.id === id);
  if (i === -1) return null;
  const prev = list[i];
  list[i] = {
    ...prev,
    name: input.name.trim() || '未命名组合',
    description: input.description.trim(),
    items: input.items,
    ...(input.category !== undefined ? { category: input.category.trim() || prev.category } : {}),
    ...(input.tags !== undefined ? { tags: input.tags.length > 0 ? input.tags : prev.tags } : {}),
  };
  writeStored(list);
  notifyChanged();
  return storedToCombo(list[i]);
}

export function deleteUserCombo(id: string): boolean {
  const list = parseStored();
  const next = list.filter((c) => c.id !== id);
  if (next.length === list.length) return false;
  writeStored(next);
  notifyChanged();
  return true;
}
