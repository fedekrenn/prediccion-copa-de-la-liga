import { e as createComponent, s as spreadAttributes, u as unescapeHTML, r as renderTemplate, m as maybeRenderHead, h as addAttribute, f as createAstro, k as renderHead, l as renderSlot, n as renderComponent, o as renderScript } from '../chunks/astro/server_BooCz2sS.mjs';
/* empty css                                 */
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useMemo, useEffect } from 'react';
import { create } from 'zustand';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { toast, Toaster } from 'sonner';
export { renderers } from '../renderers.mjs';

function createSvgComponent({ meta, attributes, children }) {
  const Component = createComponent((_, props) => {
    const normalizedProps = normalizeProps(attributes, props);
    return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const linkedin = createSvgComponent({"meta":{"src":"/_astro/linkedin.wwRPmhM-.svg","width":256,"height":256,"format":"svg"},"attributes":{"width":"256","height":"256","preserveAspectRatio":"xMidYMid","viewBox":"0 0 256 256"},"children":"<path d=\"M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453\" fill=\"#fff\" />"});

const github = createSvgComponent({"meta":{"src":"/_astro/github.C0uC5FIr.svg","width":256,"height":250,"format":"svg"},"attributes":{"viewBox":"0 0 256 250","width":"256","height":"250","fill":"currentColor","preserveAspectRatio":"xMidYMid"},"children":"<path d=\"M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z\" fill=\"#fff\" />"});

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer> <p class="text-sm sm:text-base">Desarrollado por Federico Krenn</p> <div class="flex gap-3 my-2"> <a href="https://www.linkedin.com/in/fkrenn" target="_blank"> <img${addAttribute(linkedin.src, "src")} alt="Logo de Linkedin" class="w-6 sm:w-8"> </a> <a href="https://github.com/fedekrenn" target="_blank"> <img${addAttribute(github.src, "src")} alt="Logo de Github" class="w-6 sm:w-8"> </a> </div> <p class="text-xs text-gray-500 my-3 sm:text-base">
Esta webapp fue presentada como proyecto final para la materia <b>
"Tecnologías Web"
</b> en la <a class="underline" href="https://www.unlvirtual.edu.ar/?portfolio=tecnicatura-en-software-libre" target="_blank">
Tecnicatura en Software Libre
</a> de una <a class="underline" href="https://www.fich.unl.edu.ar/" target="_blank">
UNL | FICH
</a> </p> <p><a href="/docs">API documentation</a></p> </footer>`;
}, "C:/Users/fedek/Desktop/Programaci\xF3n/prediccion-copa-de-la-liga/src/ui/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="description" content="Predicción para la Copa de La Liga 2024 del fútbol Argentino. En base a los resultados se calcula el % de rendimiento para así poder estimar las posiciones."><meta name="viewport" content="width=device-width"><link rel="shortcut icon" href="favicon.png" type="image/x-icon"><title>${title}</title>${renderHead()}</head> <body class="px-3 md:px-5 mx-auto"> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/Users/fedek/Desktop/Programaci\xF3n/prediccion-copa-de-la-liga/src/ui/layouts/Layout.astro", void 0);

const $$Introduction = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section> <p class="text-center sm:text-left">
Predicción sobre como finalizarían las posiciones de la Liga Profesional de
    Fútbol Argentino (Tabla final anual) tomando en cuenta el desempeño de cada
    equipo en el torneo actual.
</p> <p class="my-2">
Con aproximadamente <span class="font-bold text-[#FF3F03]">40 Pts</span> un equipo
    se salvaría del descenso.
</p> <button id="show-dialog" class="block mx-auto my-10 px-7 py-2 bg-[#0c151c]">
Más información
</button> <dialog id="dialog" class="w-[90%] m-auto max-w-lg p-8"> <div class="flex flex-col gap-2.5"> <h3 class="text-[1.5em] underline">A tener en cuenta</h3> <p>
La tabla es <strong>dinámica</strong> y está conectada a una fuente de información
        que <strong>se actualiza automáticamente</strong>, por lo que los datos
        que se muestran son siempre los más recientes, incluso si los equipos
        están jugando en este momento.
</p> <p>
Se calcula el % de efectividad en base a la cantidad de puntos actuales
        de cada equipo tomando sólo en cuenta el torneo actual (Apertura) y en
        base a eso se <strong>estima</strong> cuantos puntos obtendrá al finalizar
        el campeonato de conservar esa efectividad. El resultado es un estimativo
        para copas + descensos.
</p> <p>
Nada garantiza que efectivamente terminen como la tabla a continuación
        indica.
</p> <button id="close-dialog" class="mt-5 py-2 bg-[#0c151c]">Cerrar</button> </div> </dialog> </section> ${renderScript($$result, "C:/Users/fedek/Desktop/Programaci\xF3n/prediccion-copa-de-la-liga/src/ui/components/Introduction.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/fedek/Desktop/Programaci\xF3n/prediccion-copa-de-la-liga/src/ui/components/Introduction.astro", void 0);

function Legend() {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-end gap-5 text-[0.6em] mx-0 my-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "w-[70px] mb-[5px] mx-auto", children: "Copa Libertadores" }),
      /* @__PURE__ */ jsx("div", { className: "inline-block w-2.5 h-2.5 green" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "w-[70px] mb-[5px] mx-auto", children: "Copa Sudamericana" }),
      /* @__PURE__ */ jsx("div", { className: "inline-block w-2.5 h-2.5 yellow" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "w-[70px] mb-[5px] mx-auto", children: "Descendería por tabla" }),
      /* @__PURE__ */ jsx("div", { className: "inline-block w-2.5 h-2.5 red" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "w-[70px] mb-[5px] mx-auto", children: "Descendería por promedios" }),
      /* @__PURE__ */ jsx("div", { className: "inline-block w-2.5 h-2.5 dark-red" })
    ] })
  ] });
}

function ActualTab() {
  return /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
    /* @__PURE__ */ jsx("th", { title: "Posición actual", className: "font-thin text-xs text-center", children: "Pos" }),
    /* @__PURE__ */ jsx(
      "th",
      {
        title: "Nombre del equipo",
        className: "w-[150px] sm:w-[220px] font-thin text-xs",
        children: "Equipo"
      }
    ),
    /* @__PURE__ */ jsx("th", { title: "Puntos totales", className: "font-thin text-xs text-center", children: "PTS" }),
    /* @__PURE__ */ jsx("th", { title: "Partidos jugados", className: "font-thin text-xs text-center", children: "PJ" }),
    /* @__PURE__ */ jsx("th", { title: "Partidos ganados", className: "font-thin text-xs text-center", children: "PG" }),
    /* @__PURE__ */ jsx(
      "th",
      {
        title: "Partidos empatados",
        className: "font-thin text-xs text-center",
        children: "PE"
      }
    ),
    /* @__PURE__ */ jsx("th", { title: "Partidos perdidos", className: "font-thin text-xs text-center", children: "PP" }),
    /* @__PURE__ */ jsx(
      "th",
      {
        title: "Diferencia de goles",
        className: "font-thin text-xs text-center",
        children: "DG"
      }
    )
  ] }) });
}

const Live = ({ liveData }) => {
  const { score, status } = liveData;
  const getColor = (status2) => {
    switch (status2) {
      case 1:
        return "bg-green-800";
      case 2:
        return "bg-red-800";
      case 3:
        return "bg-yellow-500 text-black";
      default:
        return "bg-gray-400";
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: `text-[0.7rem] ${getColor(status)} rounded-full px-2 py-0`, children: [
    score[0],
    ":",
    score[1]
  ] });
};

function ActualTable({ teamData, currentPosition }) {
  const {
    currentData: {
      totalPoints,
      playedMatches,
      liveData,
      goalsDifference,
      gamesWon,
      gamesLost,
      gamesEven
    },
    teamInfo: { name, img }
  } = teamData;
  const paintColor = (currentPosition2) => {
    if (currentPosition2 <= 8) return "green font-bold";
    return "";
  };
  return /* @__PURE__ */ jsxs("tr", { children: [
    /* @__PURE__ */ jsx("td", { className: paintColor(currentPosition), children: currentPosition || "-" }),
    /* @__PURE__ */ jsxs("td", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("img", { src: img, className: "mr-2", width: 18, height: 18 }),
        name
      ] }),
      liveData && /* @__PURE__ */ jsx(Live, { liveData })
    ] }),
    /* @__PURE__ */ jsx("td", { children: totalPoints }),
    /* @__PURE__ */ jsx("td", { children: playedMatches }),
    /* @__PURE__ */ jsx("td", { children: gamesWon }),
    /* @__PURE__ */ jsx("td", { children: gamesEven }),
    /* @__PURE__ */ jsx("td", { children: gamesLost }),
    /* @__PURE__ */ jsx("td", { children: goalsDifference })
  ] });
}

function PredictionTable({ teamData }) {
  const {
    currentData: { playedMatches, liveData, annualPoints },
    predictions: {
      classification,
      position,
      estimatedTotalPoints,
      estimatedAverage,
      effectivityPercentage
    },
    teamInfo: { name, img }
  } = teamData;
  const isValid = (value) => !isNaN(value);
  const paintColor = (classification2) => {
    switch (classification2) {
      case "libertadores":
        return "green";
      case "sudamericana":
        return "yellow";
      case "descensoPorTabla":
        return "red";
      case "descensoPromedios":
        return "dark-red";
      default:
        return "";
    }
  };
  return /* @__PURE__ */ jsxs("tr", { children: [
    /* @__PURE__ */ jsx("td", { className: `${paintColor(classification)}`, children: position }),
    /* @__PURE__ */ jsxs("td", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("img", { src: img, className: "mr-2", width: 18, height: 18 }),
        name
      ] }),
      liveData && /* @__PURE__ */ jsx(Live, { liveData })
    ] }),
    /* @__PURE__ */ jsx("td", { children: playedMatches === 0 ? /* @__PURE__ */ jsx("span", { title: "Todavía no jugó ningún partido de este campeonato", children: "-" }) : isValid(effectivityPercentage) ? `${effectivityPercentage}%` : "-" }),
    /* @__PURE__ */ jsx("td", { title: `Puntos actuales en la tabla anual: ${annualPoints}`, children: isValid(estimatedTotalPoints) ? estimatedTotalPoints : "-" }),
    /* @__PURE__ */ jsx("td", { children: playedMatches }),
    /* @__PURE__ */ jsx("td", { children: isValid(estimatedAverage) ? estimatedAverage.toFixed(3) : "-" })
  ] });
}

const useActiveTab = create((set) => ({
  activeTab: "predictions",
  setActiveTab: (tab) => set({ activeTab: tab })
}));

function RowContainer({ teamData, currentPosition }) {
  const activeTab = useActiveTab((state) => state.activeTab);
  return activeTab === "predictions" ? /* @__PURE__ */ jsx(PredictionTable, { teamData }) : /* @__PURE__ */ jsx(ActualTable, { teamData, currentPosition });
}

function Tbody({ results }) {
  const [animationParent] = useAutoAnimate({ duration: 400 });
  return /* @__PURE__ */ jsx("tbody", { ref: animationParent, children: results.map((team, i) => /* @__PURE__ */ jsx(
    RowContainer,
    {
      teamData: team,
      currentPosition: i + 1
    },
    team.teamInfo.name
  )) });
}

function SimpleTable({ results }) {
  return /* @__PURE__ */ jsxs("table", { className: "w-full mx-auto text-xs sm:text-sm", children: [
    /* @__PURE__ */ jsx(ActualTab, {}),
    /* @__PURE__ */ jsx(Tbody, { results })
  ] });
}

const caretDown = createSvgComponent({"meta":{"src":"/_astro/caretDown.IpzxXZKz.svg","width":24,"height":24,"format":"svg"},"attributes":{"class":"icon icon-tabler icon-tabler-caret-down","width":"24","height":"24","viewBox":"0 0 24 24","stroke-width":"2","stroke":"#fff","fill":"none","stroke-linecap":"round","stroke-linejoin":"round"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /><path d=\"M6 10l6 6l6 -6h-12\" />"});

const caretUp = createSvgComponent({"meta":{"src":"/_astro/caretUp.DOXQOSQj.svg","width":24,"height":24,"format":"svg"},"attributes":{"class":"icon icon-tabler icon-tabler-caret-up","width":"24","height":"24","viewBox":"0 0 24 24","stroke-width":"1.5","stroke":"#fff","fill":"none","stroke-linecap":"round","stroke-linejoin":"round"},"children":"<path stroke=\"none\" d=\"M0 0h24v24H0z\" fill=\"none\" /><path d=\"M18 14l-6 -6l-6 6h12\" />"});

function FilterHead({ filterOrder, title }) {
  return /* @__PURE__ */ jsxs("div", { className: "cursor-pointer align-middle flex items-center", children: [
    filterOrder === "asc" ? /* @__PURE__ */ jsx("img", { className: "w-4 sm:w-5", src: caretDown.src, alt: "caretDown" }) : /* @__PURE__ */ jsx("img", { className: "w-4 sm:w-5", src: caretUp.src, alt: "caretUp" }),
    /* @__PURE__ */ jsx("span", { className: "font-thin text-xs", children: title })
  ] });
}

const useSorting = create((set) => ({
  effectivitySort: "asc",
  pointsSort: "asc",
  averageSort: "asc",
  playedMatchesSort: "asc",
  setEffectivitySort: (order) => set({ effectivitySort: order }),
  setPointsSort: (order) => set({ pointsSort: order }),
  setAverageSort: (order) => set({ averageSort: order }),
  setPlayedMatchesSort: (order) => set({ playedMatchesSort: order })
}));

function PredictionTab({ sortFunctions }) {
  const {
    sortByEffectivity,
    sortByPoints,
    sortByAverage,
    sortByPlayedMatches
  } = sortFunctions;
  const { effectivitySort, pointsSort, averageSort, playedMatchesSort } = useSorting();
  return /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
    /* @__PURE__ */ jsx("th", { className: "font-thin text-xs w-[41px]", children: "Pos" }),
    /* @__PURE__ */ jsx("th", { className: "w-[150px] sm:w-[220px] font-thin text-xs", children: "Equipo" }),
    /* @__PURE__ */ jsx("th", { title: "Ordenar por efectividad", onClick: sortByEffectivity, children: /* @__PURE__ */ jsx(FilterHead, { filterOrder: effectivitySort, title: "EFC" }) }),
    /* @__PURE__ */ jsx("th", { title: "Ordenar por puntos estimados", onClick: sortByPoints, children: /* @__PURE__ */ jsx(FilterHead, { filterOrder: pointsSort, title: "PTS" }) }),
    /* @__PURE__ */ jsx("th", { title: "Ordenar por partidos jugados", onClick: sortByPlayedMatches, children: /* @__PURE__ */ jsx(FilterHead, { filterOrder: playedMatchesSort, title: "PJ" }) }),
    /* @__PURE__ */ jsx("th", { title: "Ordenar por promedio estimado", onClick: sortByAverage, children: /* @__PURE__ */ jsx(FilterHead, { filterOrder: averageSort, title: "PROM" }) })
  ] }) });
}

const rankTeams = (teamList) => {
  return teamList.toSorted((a, b) => {
    if (a.currentData.totalPoints === b.currentData.totalPoints) {
      return b.currentData.goalsDifference - a.currentData.goalsDifference;
    } else {
      return b.currentData.totalPoints - a.currentData.totalPoints;
    }
  });
};
const useResults = create((set) => ({
  predictionResults: [],
  actualTableResults: {
    A: [],
    B: []
  },
  setResults: (results) => {
    set({ predictionResults: results });
    const groupedResults = {
      A: rankTeams(results.filter((team) => team.currentData.group === "A")),
      B: rankTeams(results.filter((team) => team.currentData.group === "B"))
    };
    set({ actualTableResults: groupedResults });
  }
}));

const toggleSortOrder = (currentOrder) => {
  return currentOrder === "asc" ? "desc" : "asc";
};
function SortableTable() {
  const [currentSortBy, setCurrentSortBy] = useState(null);
  const results = useResults((state) => state.predictionResults);
  const {
    effectivitySort,
    pointsSort,
    averageSort,
    playedMatchesSort,
    setEffectivitySort,
    setPointsSort,
    setAverageSort,
    setPlayedMatchesSort
  } = useSorting();
  const sortedResults = useMemo(() => {
    if (!currentSortBy) return results;
    return results.toSorted((a, b) => {
      switch (currentSortBy) {
        case "effectivity": {
          if (a.predictions.effectivityPercentage === b.predictions.effectivityPercentage) {
            return effectivitySort === "asc" ? b.predictions.position - a.predictions.position : a.predictions.position - b.predictions.position;
          }
          return effectivitySort === "asc" ? a.predictions.effectivityPercentage - b.predictions.effectivityPercentage : b.predictions.effectivityPercentage - a.predictions.effectivityPercentage;
        }
        case "points":
          return pointsSort === "asc" ? b.predictions.position - a.predictions.position : a.predictions.position - b.predictions.position;
        case "average":
          return averageSort === "asc" ? a.predictions.estimatedAverage - b.predictions.estimatedAverage : b.predictions.estimatedAverage - a.predictions.estimatedAverage;
        case "playedMatches":
          return playedMatchesSort === "asc" ? a.currentData.playedMatches - b.currentData.playedMatches : b.currentData.playedMatches - a.currentData.playedMatches;
        default:
          return 0;
      }
    });
  }, [
    results,
    currentSortBy,
    effectivitySort,
    pointsSort,
    averageSort,
    playedMatchesSort
  ]);
  const sortByEffectivity = () => {
    setCurrentSortBy("effectivity");
    setEffectivitySort(toggleSortOrder(effectivitySort));
  };
  const sortByPoints = () => {
    setCurrentSortBy("points");
    setPointsSort(toggleSortOrder(pointsSort));
  };
  const sortByAverage = () => {
    setCurrentSortBy("average");
    setAverageSort(toggleSortOrder(averageSort));
  };
  const sortByPlayedMatches = () => {
    setCurrentSortBy("playedMatches");
    setPlayedMatchesSort(toggleSortOrder(playedMatchesSort));
  };
  const resetSorts = () => {
    setCurrentSortBy(null);
    setEffectivitySort("asc");
    setPointsSort("asc");
    setAverageSort("asc");
    setPlayedMatchesSort("asc");
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    currentSortBy !== null && /* @__PURE__ */ jsx("div", { className: "flex justify-center my-4", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: resetSorts,
        className: "px-2 py-1 bg-[#0c151c] text-xs",
        children: "Resetear orden"
      }
    ) }),
    /* @__PURE__ */ jsxs("table", { className: "w-full mx-auto text-xs sm:text-sm", children: [
      /* @__PURE__ */ jsx(
        PredictionTab,
        {
          sortFunctions: {
            sortByEffectivity,
            sortByPoints,
            sortByAverage,
            sortByPlayedMatches
          }
        }
      ),
      /* @__PURE__ */ jsx(Tbody, { results: sortedResults })
    ] })
  ] });
}

function TableContainer() {
  const [animationParent] = useAutoAnimate({ duration: 300 });
  const [animationGroupA] = useAutoAnimate({ duration: 300 });
  const [animationGroupB] = useAutoAnimate({ duration: 300 });
  const activeTab = useActiveTab((state) => state.activeTab);
  const actualTableResults = useResults((state) => state.actualTableResults);
  return /* @__PURE__ */ jsxs("div", { ref: animationParent, children: [
    activeTab === "predictions" && /* @__PURE__ */ jsx(Legend, {}),
    activeTab === "predictions" ? /* @__PURE__ */ jsx(SortableTable, {}) : /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs("div", { ref: animationGroupA, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-center mb-4 text-green-200", children: "🏆 Grupo A" }),
        /* @__PURE__ */ jsx(SimpleTable, { results: actualTableResults.A })
      ] }),
      /* @__PURE__ */ jsxs("div", { ref: animationGroupB, children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-center mb-4 text-green-200", children: "🏆 Grupo B" }),
        /* @__PURE__ */ jsx(SimpleTable, { results: actualTableResults.B })
      ] })
    ] })
  ] });
}

function TabsContainer() {
  const activeTab = useActiveTab((state) => state.activeTab);
  const setActiveTab = useActiveTab((state) => state.setActiveTab);
  const setButtonClass = (tab) => `px-7 py-3 text-sm font-medium transition-all duration-200 rounded-t-[10px] rounded-b-none w-full focus:shadow-none ${activeTab === tab ? "bg-[#243447] text-green-200 border-b-2 border-gray-300 hover:bg-[#243447] hover:cursor-default " : "bg-[#161F27] text-gray-600"}`;
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex mb-6 overflow-hidden max-w-[450px] mx-auto", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveTab("predictions"),
          className: setButtonClass("predictions"),
          children: "📊 Tabla de Predicciones"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setActiveTab("current"),
          className: setButtonClass("current"),
          children: "🏆 Tabla Actual"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(TableContainer, {})
  ] });
}

function Skeleton({
  background = "#425164",
  color = "#68798d",
  width = 500,
  height = 50
}) {
  const containerConfig = {
    backgroundColor: background,
    width,
    height
  };
  const movementConfig = {
    backgroundColor: color
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "bg-[#425164] overflow-hidden rounded-[5px] max-w-[100%]",
      style: containerConfig,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: "h-[110%] w-5 relative -translate-x-2/4 -translate-y-2/4 blur-2xl animate-[moveToRight_1.5s_infinite] left-2/4 top-2/4 animation-timing-function: ease-in-out",
          style: movementConfig
        }
      )
    }
  );
}

function LoaderContainer() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[5px]", children: [
    /* @__PURE__ */ jsx("span", { className: "w-4 h-4 block relative shadow-[-24px_0_#fff,24px_0_#fff] box-border animate-[shadowPulse_2s_linear_infinite] mx-auto my-[35px] rounded-[50%]" }),
    /* @__PURE__ */ jsx(Skeleton, { width: "100%", height: 50 }),
    Array.from({ length: 28 }).map((_, index) => /* @__PURE__ */ jsx(Skeleton, { width: "100%", height: 32 }, index))
  ] });
}

function FetchData() {
  const [loading, setLoading] = useState(true);
  const setResults = useResults((state) => state.setResults);
  useEffect(() => {
    fetch("/api/prediction").then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then((data) => {
      setResults(data);
    }).catch((error) => {
      toast.error(error.message);
      setResults([]);
    }).finally(() => {
      setLoading(false);
    });
  }, []);
  return /* @__PURE__ */ jsxs("section", { className: "w-full max-w-lg mx-auto", children: [
    /* @__PURE__ */ jsx(Toaster, {}),
    loading ? /* @__PURE__ */ jsx(LoaderContainer, {}) : /* @__PURE__ */ jsx(TabsContainer, {})
  ] });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Predicci\xF3n Liga Profesional F\xFAtbol Argentino 2025" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <h1 class="text-center m-10 md:m-12 text-2xl sm:text-4xl font-semibold">
Predicción LPF Argentina - 2025
</h1> ${renderComponent($$result2, "Introduction", $$Introduction, {})} ${renderComponent($$result2, "FetchData", FetchData, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@components/FetchData", "client:component-export": "default" })} </main> ` })}`;
}, "C:/Users/fedek/Desktop/Programaci\xF3n/prediccion-copa-de-la-liga/src/pages/index.astro", void 0);

const $$file = "C:/Users/fedek/Desktop/Programación/prediccion-copa-de-la-liga/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
