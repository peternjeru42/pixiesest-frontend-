import { PHOTOGRAPHER, STUDIO_STATS } from '../mock-data';
import type { Photographer } from '../types';

const wait = (ms = 200) => new Promise(r => setTimeout(r, ms));

export async function getProfile(): Promise<Photographer> { await wait(); return PHOTOGRAPHER; }
export async function updateProfile(patch: Partial<Photographer>) {
  await wait(400); return { ...PHOTOGRAPHER, ...patch };
}
export async function getStudioStats() { await wait(); return STUDIO_STATS; }
