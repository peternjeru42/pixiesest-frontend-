import { SETS, SET_MEDIA } from '../mock-data';
import type { Set } from '../types';

const wait = (ms = 200) => new Promise(r => setTimeout(r, ms));

export async function listSets(_collectionId: string) { await wait(); return Object.values(SETS); }
export async function getSet(id: string): Promise<Set | null> { await wait(); return SETS[id] ?? null; }
export async function createSet(_collectionId: string, input: Partial<Set>) {
  await wait(400);
  return { ...SETS.ceremony, ...input, id: 'new-' + Date.now() } as Set;
}
export async function updateSet(id: string, patch: Partial<Set>) { await wait(); return { ...SETS[id], ...patch }; }
export async function deleteSet(_id: string) { await wait(); return { ok: true }; }
export async function getSetMedia(id: string) { await wait(); return SET_MEDIA[id] ?? []; }
