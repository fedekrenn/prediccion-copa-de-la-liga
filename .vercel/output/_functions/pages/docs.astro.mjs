import { e as createComponent, f as createAstro, k as renderHead, l as renderSlot, r as renderTemplate, n as renderComponent, o as renderScript, m as maybeRenderHead } from '../chunks/astro/server_BooCz2sS.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$DocsLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$DocsLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description" content="Predicción para la Copa de La Liga 2024 del fútbol Argentino. En base a los resultados se calcula el % de rendimiento para así poder estimar las posiciones."><meta name="viewport" content="width=device-width"><link rel="shortcut icon" href="favicon.png" type="image/x-icon"><link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.27.1/swagger-ui.css"><title>${title}</title>${renderHead()}</head> <body class="px-3 md:px-5 mx-auto"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/fedek/Desktop/Programaci\xF3n/prediccion-copa-de-la-liga/src/ui/layouts/DocsLayout.astro", void 0);

const $$Docs = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DocsLayout", $$DocsLayout, { "title": "API Documentation - Predicci\xF3n Copa de la Liga" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-gray-50"> <div class="container mx-auto py-4"> <header> <nav> <a href="/">Volver a la web</a> </nav> <h1 class="text-3xl font-bold text-center mb-8 text-gray-800">
API Documentation
</h1> </header> <div id="swagger" class="max-w-6xl mx-auto"></div> </div> </main> ` })} ${renderScript($$result, "C:/Users/fedek/Desktop/Programaci\xF3n/prediccion-copa-de-la-liga/src/pages/docs.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/fedek/Desktop/Programaci\xF3n/prediccion-copa-de-la-liga/src/pages/docs.astro", void 0);

const $$file = "C:/Users/fedek/Desktop/Programación/prediccion-copa-de-la-liga/src/pages/docs.astro";
const $$url = "/docs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Docs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
