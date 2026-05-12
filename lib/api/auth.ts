import { PHOTOGRAPHER } from '../mock-data';

const wait = (ms = 400) => new Promise(r => setTimeout(r, ms));

export async function login(email: string, password: string) {
  await wait();
  if (!email || !password) throw new Error('Email and password are required');
  return { token: 'mock-jwt-token', user: PHOTOGRAPHER };
}
export async function register(input: { firstName: string; lastName: string; businessName: string; email: string; password: string }) {
  await wait(600);
  return { token: 'mock-jwt-token', user: { ...PHOTOGRAPHER, ...input, displayName: input.firstName + ' ' + input.lastName } };
}
export async function requestPasswordReset(email: string) { await wait(); return { ok: true, email }; }
export async function resetPassword(_token: string, _password: string) { await wait(); return { ok: true }; }
export async function verifyEmail(_token: string) { await wait(); return { ok: true }; }
export async function resendVerification() { await wait(); return { ok: true }; }
export async function logout() { await wait(100); return { ok: true }; }
