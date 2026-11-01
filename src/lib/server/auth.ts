import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// The Google login only lets the café's accounts in; this is the second check,
// on the server, for every management page and write endpoint.
async function authorizedEmail(locals: RequestEvent['locals']): Promise<string | null> {
  const authorized = (env.AUTHORIZED_USERS ?? '').split(',').map((email) => email.trim()).filter(Boolean);
  const session = await locals.getSession();
  const email = session?.user?.email;
  return email && authorized.includes(email) ? email : null;
}

/** For pages: redirects to the sign-in page. Returns the user's email. */
export async function requireUserPage(locals: RequestEvent['locals']): Promise<string> {
  const email = await authorizedEmail(locals);
  if (!email) {
    redirect(303, '/auth/signin?csrf=true');
  }
  return email;
}

/** For endpoints: answers 401. Returns the user's email. */
export async function requireUserApi(locals: RequestEvent['locals']): Promise<string> {
  const email = await authorizedEmail(locals);
  if (!email) {
    error(401, 'Unauthorized');
  }
  return email;
}
