import { ACTIVITY } from '../mock-data';

const wait = (ms = 200) => new Promise(r => setTimeout(r, ms));

export async function listActivity(filter?: { collectionId?: string; type?: string }) {
  await wait();
  let r = [...ACTIVITY];
  if (filter?.collectionId) r = r.filter(a => a.collectionId === filter.collectionId);
  if (filter?.type) r = r.filter(a => a.type === filter.type);
  return r;
}
