import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_C8gC3P76.mjs';
import { manifest } from './manifest_QhTh1erI.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/get-token.astro.mjs');
const _page2 = () => import('./pages/api/openapi.astro.mjs');
const _page3 = () => import('./pages/api/prediction.astro.mjs');
const _page4 = () => import('./pages/api/register.astro.mjs');
const _page5 = () => import('./pages/api/revoke-token.astro.mjs');
const _page6 = () => import('./pages/docs.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.16.6_@types+node@24_7f8e05ef5086aa61ff133f4fc4b2dd37/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/get-token.ts", _page1],
    ["src/pages/api/openapi.ts", _page2],
    ["src/pages/api/prediction.ts", _page3],
    ["src/pages/api/register.ts", _page4],
    ["src/pages/api/revoke-token.ts", _page5],
    ["src/pages/docs.astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "71e11884-521f-47f3-8920-b1fb11ac9c52",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
