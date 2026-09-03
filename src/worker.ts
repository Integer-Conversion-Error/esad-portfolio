const IMMUTABLE_ASSET_PATHS = ["/_astro/", "/images/", "/favicon.svg"];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    const { pathname } = new URL(request.url);

    headers.set("X-Frame-Options", pathname === "/resume.pdf" ? "SAMEORIGIN" : "DENY");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

    if (IMMUTABLE_ASSET_PATHS.some((prefix) => pathname.startsWith(prefix))) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
} satisfies ExportedHandler<Env>;
