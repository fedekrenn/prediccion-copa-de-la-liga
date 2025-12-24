import { p as decodeKey } from './chunks/astro/server_BooCz2sS.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Bu7niPQe.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/fedek/Desktop/Programaci%C3%B3n/prediccion-copa-de-la-liga/","cacheDir":"file:///C:/Users/fedek/Desktop/Programaci%C3%B3n/prediccion-copa-de-la-liga/node_modules/.astro/","outDir":"file:///C:/Users/fedek/Desktop/Programaci%C3%B3n/prediccion-copa-de-la-liga/dist/","srcDir":"file:///C:/Users/fedek/Desktop/Programaci%C3%B3n/prediccion-copa-de-la-liga/src/","publicDir":"file:///C:/Users/fedek/Desktop/Programaci%C3%B3n/prediccion-copa-de-la-liga/public/","buildClientDir":"file:///C:/Users/fedek/Desktop/Programaci%C3%B3n/prediccion-copa-de-la-liga/dist/client/","buildServerDir":"file:///C:/Users/fedek/Desktop/Programaci%C3%B3n/prediccion-copa-de-la-liga/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.16.6_@types+node@24_7f8e05ef5086aa61ff133f4fc4b2dd37/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/api/get-token","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/get-token\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"get-token","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/get-token.ts","pathname":"/api/get-token","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/api/openapi","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/openapi\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"openapi","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/openapi.ts","pathname":"/api/openapi","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/api/prediction","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/prediction\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"prediction","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/prediction.ts","pathname":"/api/prediction","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/api/register","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/register\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/register.ts","pathname":"/api/register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/api/revoke-token","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/revoke-token\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"revoke-token","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/revoke-token.ts","pathname":"/api/revoke-token","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[],"routeData":{"route":"/docs","isIndex":false,"type":"page","pattern":"^\\/docs\\/?$","segments":[[{"content":"docs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/docs.astro","pathname":"/docs","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"stage":"head-inline","children":"window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };\n\t\tvar script = document.createElement('script');\n\t\tscript.defer = true;\n\t\tscript.src = '/_vercel/insights/script.js';\n\t\tvar head = document.querySelector('head');\n\t\thead.appendChild(script);\n\t"}],"styles":[{"type":"external","src":"/_astro/index.BuN5fT5G.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/fedek/Desktop/Programación/prediccion-copa-de-la-liga/src/pages/docs.astro",{"propagation":"none","containsHead":true}],["C:/Users/fedek/Desktop/Programación/prediccion-copa-de-la-liga/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/get-token@_@ts":"pages/api/get-token.astro.mjs","\u0000@astro-page:src/pages/api/openapi@_@ts":"pages/api/openapi.astro.mjs","\u0000@astro-page:src/pages/api/prediction@_@ts":"pages/api/prediction.astro.mjs","\u0000@astro-page:src/pages/api/register@_@ts":"pages/api/register.astro.mjs","\u0000@astro-page:src/pages/api/revoke-token@_@ts":"pages/api/revoke-token.astro.mjs","\u0000@astro-page:src/pages/docs@_@astro":"pages/docs.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.16.6_@types+node@24_7f8e05ef5086aa61ff133f4fc4b2dd37/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_QhTh1erI.mjs","C:/Users/fedek/Desktop/Programación/prediccion-copa-de-la-liga/node_modules/.pnpm/astro@5.16.6_@types+node@24_7f8e05ef5086aa61ff133f4fc4b2dd37/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DHI1fPtT.mjs","@components/FetchData":"_astro/FetchData.Dv6s4rY1.js","@astrojs/react/client.js":"_astro/client.BEXaYeuP.js","C:/Users/fedek/Desktop/Programación/prediccion-copa-de-la-liga/src/pages/docs.astro?astro&type=script&index=0&lang.ts":"_astro/docs.astro_astro_type_script_index_0_lang.DR49GI9T.js","C:/Users/fedek/Desktop/Programación/prediccion-copa-de-la-liga/src/ui/components/Introduction.astro?astro&type=script&index=0&lang.ts":"_astro/Introduction.astro_astro_type_script_index_0_lang.B_IF6ZA3.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/fedek/Desktop/Programación/prediccion-copa-de-la-liga/src/ui/components/Introduction.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"dialog\"),o=document.getElementById(\"show-dialog\"),t=document.getElementById(\"close-dialog\");e&&o&&o.addEventListener(\"click\",()=>{e.showModal()});e&&t&&t.addEventListener(\"click\",()=>{e.close()});"]],"assets":["/_astro/linkedin.wwRPmhM-.svg","/_astro/github.C0uC5FIr.svg","/_astro/caretDown.IpzxXZKz.svg","/_astro/caretUp.DOXQOSQj.svg","/_astro/index.BuN5fT5G.css","/favicon.png","/_astro/client.BEXaYeuP.js","/_astro/docs.astro_astro_type_script_index_0_lang.DR49GI9T.js","/_astro/FetchData.Dv6s4rY1.js","/_astro/index.D_CfHGAb.js","/_astro/_commonjsHelpers.gnU0ypJ3.js"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"1hTjcZKI0a1uMqNIBwEjTdFHwqDOI0H/k5asTdCcDtg="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
