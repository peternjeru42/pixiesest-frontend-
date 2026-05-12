// Direct-to-storage upload stub. The real impl will request a signed URL
// from Django and PUT the file directly to S3 / R2 / GCS so originals are preserved.
const wait = (ms = 200) => new Promise(r => setTimeout(r, ms));

export interface UploadInit {
  uploadId: string;
  putUrl: string;
  expiresAt: string;
}
export async function initUpload(_input: { filename: string; sizeMB: number; collectionId: string; setId: string }): Promise<UploadInit> {
  await wait();
  return { uploadId: 'up-' + Date.now(), putUrl: 'https://upload.example.com/signed', expiresAt: '2026-05-12T01:00:00Z' };
}
export async function completeUpload(_uploadId: string) { await wait(300); return { ok: true }; }
export async function reportProgress(_uploadId: string, _percent: number) { /* noop */ }
