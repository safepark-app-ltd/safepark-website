import type { APIRoute } from 'astro';

// The live site welcomes search engines and AI tools (proposal, page 15).
// Any other address, such as preview.safepark.app, asks every crawler to stay away.

const live = (sitemap: string) => `# safepark.app
# Search engines and AI answer tools are welcome on the public website.
# The map (map.safepark.app) has its own robots.txt that blocks all of them.
User-agent: *
Allow: /

# Still an open question: whether AI training crawlers may read the site.
# To block them while staying in search and AI answers, uncomment this block.
# User-agent: GPTBot
# User-agent: ClaudeBot
# User-agent: Google-Extended
# User-agent: Applebot-Extended
# User-agent: meta-externalagent
# User-agent: CCBot
# Disallow: /

Sitemap: ${sitemap}
`;

const preview = `# Preview copy of safepark.app. Not for indexing.
User-agent: *
Disallow: /
`;

export const GET: APIRoute = ({ site }) => {
  const body = site?.hostname === 'safepark.app' ? live(new URL('/sitemap-index.xml', site).href) : preview;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
