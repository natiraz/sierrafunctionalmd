// Cloudflare Pages Function — handles /auth
// Starts the GitHub login for the Decap editor.
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const redirectUri = `${url.origin}/callback`;

  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorize.searchParams.set("redirect_uri", redirectUri);
  authorize.searchParams.set("scope", "repo,user");
  authorize.searchParams.set("state", crypto.randomUUID());

  return Response.redirect(authorize.toString(), 302);
}
