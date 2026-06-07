// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

function tabletopSpaFallbackPlugin() {
  return {
    name: 'tabletop-spa-fallback',
    apply: 'serve',
    configureServer(server) {
      const fallbackHeader = 'x-tabletop-spa-fallback';
      const rewriteMiddleware = async (req, res, next) => {
        const originalUrl = req.url;

        if (!originalUrl || req.headers[fallbackHeader]) {
          next();
          return;
        }

        const [pathname, search = ''] = originalUrl.split('?');

        if (!pathname.startsWith('/tabletop/') || pathname === '/tabletop/') {
          next();
          return;
        }

        try {
          const protocol = server.config.server.https ? 'https' : 'http';
          const host = req.headers.host ?? '127.0.0.1:4321';
          const targetUrl = `${protocol}://${host}/tabletop/${search ? `?${search}` : ''}`;
          const response = await fetch(targetUrl, {
            method: req.method === 'HEAD' ? 'HEAD' : 'GET',
            headers: { [fallbackHeader]: '1' },
          });

          res.statusCode = response.status;

          response.headers.forEach((value, key) => {
            if (['connection', 'content-length', 'transfer-encoding'].includes(key)) {
              return;
            }

            res.setHeader(key, value);
          });

          if (req.method === 'HEAD') {
            res.end();
            return;
          }

          const body = Buffer.from(await response.arrayBuffer());
          res.end(body);
        } catch (error) {
          next(error);
        }
      };

      server.middlewares.stack.unshift({
        route: '',
        handle: rewriteMiddleware,
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: cloudflare(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss(), tabletopSpaFallbackPlugin()],
  },
});
