import type { Config, Context } from "@netlify/edge-functions";

function unauthorized(): Response {
  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Fortivex CRM", charset="UTF-8"',
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export default async (request: Request, context: Context) => {
  const expectedUser = Deno.env.get("DASHBOARD_USER") || "ayoub";
  const expectedPass = Deno.env.get("DASHBOARD_PASSWORD");

  if (!expectedPass) {
    return new Response("Dashboard locked: DASHBOARD_PASSWORD is not set", {
      status: 503,
      headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
    });
  }

  const header = request.headers.get("authorization") || "";
  if (!header.startsWith("Basic ")) return unauthorized();

  let decoded = "";
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }

  const colon = decoded.indexOf(":");
  if (colon < 0) return unauthorized();
  const user = decoded.slice(0, colon);
  const pass = decoded.slice(colon + 1);

  if (user !== expectedUser || pass !== expectedPass) return unauthorized();

  return context.next();
};

export const config: Config = {
  path: ["/dashboard", "/dashboard/*"],
};
