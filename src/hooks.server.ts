import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import type { Provider } from "@auth/core/providers";
import { env } from '$env/dynamic/private'

export const { handle } = SvelteKitAuth({
  secret: env.AUTH_SECRET,
  // @auth/sveltekit 1.x no longer trusts the host by default in production
  trustHost: true,
  providers: [
    Google({
      clientId: env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET
    }) as Provider
  ],
  callbacks: {
    redirect: () => env.NODE_ENV == 'production' ? "https://www.lamagatcafe.com/manage" : "http://localhost:5173/manage"
  }
});