import { defineEventHandler, setResponseHeader } from "h3";

const securityHeaders = {
  "Content-Security-Policy":
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https://avatars.githubusercontent.com https://*.githubusercontent.com https://lh3.googleusercontent.com; connect-src 'self' https://api.gitkut.com https://cloudflareinsights.com http://localhost:8787; worker-src 'self'; manifest-src 'self'",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
};

export default defineEventHandler((event) => {
  if (import.meta.dev) {
    return;
  }

  for (const [header, value] of Object.entries(securityHeaders)) {
    setResponseHeader(event, header, value);
  }
});
