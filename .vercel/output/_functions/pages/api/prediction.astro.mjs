import { a as config, C as CustomError, v as verifyToken } from '../../chunks/CustomError_CAa_Qado.mjs';
import axios from 'axios';
import { h as handleOptionsRequest, c as createCorsResponse } from '../../chunks/cors_BYRJwiQn.mjs';
export { renderers } from '../../renderers.mjs';

const isValidBearerToken = (authHeader) => {
  if (!authHeader) return false;
  const parts = authHeader.trim().split(" ");
  if (parts.length !== 2) return false;
  if (parts[0] !== "Bearer") return false;
  const token = parts[1];
  if (!token || token.length === 0) return false;
  if (!/^[A-Za-z0-9\-_=]+\.[A-Za-z0-9\-_=]+\.?[A-Za-z0-9\-_.+/=]*$/.test(
    token
  )) {
    return false;
  }
  return token;
};

const addEffectivityInfo = (generalTeamInfo, annualPoints, yearGamePlayed) => {
  const { totalPoints, playedMatches } = generalTeamInfo;
  const effectivityPercentage = Math.round(totalPoints / (playedMatches * 3) * 100) || 0;
  const remainingMatches = config.prediction.TOTAL_GAMES - yearGamePlayed;
  const maxPossiblePoints = remainingMatches * 3;
  const estimatedTotalPoints = Math.round(
    effectivityPercentage * maxPossiblePoints / 100 + annualPoints
  );
  return {
    ...generalTeamInfo,
    effectivityPercentage,
    estimatedTotalPoints,
    annualPoints
  };
};

const addAverageInfo = (generalTeamInfo, averageTeamInfo, yearGamePlayed) => {
  const { estimatedTotalPoints, playedMatches } = generalTeamInfo;
  const { avgTotalGames, previousSeasonsPoints } = averageTeamInfo;
  if (playedMatches === 0) {
    return {
      ...generalTeamInfo,
      estimatedAverage: previousSeasonsPoints / avgTotalGames || 0
    };
  }
  const projectedTotalPoints = estimatedTotalPoints + previousSeasonsPoints;
  const totalFinalMatches = avgTotalGames + config.prediction.TOTAL_GAMES - yearGamePlayed;
  const calculateAverage = projectedTotalPoints / totalFinalMatches || 0;
  const formattedAverage = parseFloat(calculateAverage.toFixed(3));
  return {
    ...generalTeamInfo,
    estimatedAverage: formattedAverage
  };
};

const enhanceTeamData = (actualTable, averageTable, annualTable) => {
  return actualTable.map((teamInfo) => {
    const teamInAverageTable = averageTable.find(
      ({ name }) => name === teamInfo.name
    );
    const teamInAnnualTable = annualTable.find(
      ({ name }) => name === teamInfo.name
    );
    if (!teamInAverageTable || !teamInAnnualTable) {
      throw new Error(
        `No se encontraron datos completos para el equipo: ${teamInfo.name}`
      );
    }
    const { annualPoints, yearGamePlayed } = teamInAnnualTable;
    const updatedTeamEffectivity = addEffectivityInfo(
      teamInfo,
      annualPoints,
      yearGamePlayed
    );
    const updatedTeamAverage = addAverageInfo(
      updatedTeamEffectivity,
      teamInAverageTable,
      yearGamePlayed
    );
    return updatedTeamAverage;
  });
};

const sortTeamsByPrediction = (teams) => {
  return teams.toSorted((a, b) => {
    if (a.estimatedTotalPoints !== b.estimatedTotalPoints) {
      return b.estimatedTotalPoints - a.estimatedTotalPoints;
    }
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.playedMatches !== b.playedMatches) {
      return a.playedMatches - b.playedMatches;
    }
    if (a.goalsDifference !== b.goalsDifference) {
      return b.goalsDifference - a.goalsDifference;
    }
    return b.estimatedAverage - a.estimatedAverage;
  });
};

const determineClassification = (position, isTeamRelegatedByAverages, isLastByTable) => {
  if (isTeamRelegatedByAverages) return "descensoPromedios";
  if (isLastByTable) return "descensoPorTabla";
  const positionClassification = {
    1: "libertadores",
    2: "libertadores",
    3: "libertadores",
    4: "sudamericana",
    5: "sudamericana",
    6: "sudamericana",
    7: "sudamericana",
    8: "sudamericana",
    9: "sudamericana",
    30: "descensoPorTabla"
  };
  return positionClassification[position] ?? "noClasificado";
};
const analyzeRelegationPositions = (table) => {
  let lowestAverage = Infinity;
  let lastOfAverage = null;
  for (const team of table) {
    if (team.estimatedAverage < lowestAverage) {
      lowestAverage = team.estimatedAverage;
      lastOfAverage = team;
    }
  }
  let lastTablePosition = table.length;
  if (table.at(-1) === lastOfAverage) {
    lastTablePosition--;
  }
  return {
    lastOfAverage,
    lastTablePosition
  };
};
const calculateTeamPositioning = (sortedTeams) => {
  const { lastOfAverage, lastTablePosition } = analyzeRelegationPositions(sortedTeams);
  return sortedTeams.map((team, index) => {
    const position = index + 1;
    const isLastByAverage = team === lastOfAverage;
    const isLastByTable = position === lastTablePosition;
    const classification = determineClassification(
      position,
      isLastByAverage,
      isLastByTable
    );
    return {
      position,
      classification
    };
  });
};

const generateFinalInfo = (sortedTeams) => {
  const positioningInfo = calculateTeamPositioning(sortedTeams);
  return sortedTeams.map((teamInfo, index) => {
    const { position, classification } = positioningInfo[index];
    const {
      name,
      img,
      group,
      playedMatches,
      totalPoints,
      goalsDifference,
      gamesWon,
      gamesLost,
      gamesEven,
      estimatedTotalPoints,
      estimatedAverage,
      effectivityPercentage,
      liveData,
      annualPoints
    } = teamInfo;
    return {
      teamInfo: {
        name,
        img
      },
      currentData: {
        totalPoints,
        annualPoints,
        playedMatches,
        group,
        goalsDifference,
        gamesWon,
        gamesLost,
        gamesEven,
        liveData
      },
      predictions: {
        estimatedTotalPoints,
        estimatedAverage,
        effectivityPercentage,
        position,
        classification
      }
    };
  });
};

const calculateTotal = (actualTable, averageTable, annualTable) => {
  const enrichedTeams = enhanceTeamData(actualTable, averageTable, annualTable);
  const orderedTeams = sortTeamsByPrediction(enrichedTeams);
  return generateFinalInfo(orderedTeams);
};

const transformTeamData = (externalTeamInfo, group) => {
  return externalTeamInfo.map((team) => {
    const $name = team.entity.object.short_name;
    const $totalPoints = parseInt(team.values[3].value);
    const $playedMatches = parseInt(team.values[0].value);
    const $img = `https://api.promiedos.com.ar/images/team/${team.entity.object.id}/1`;
    const $goalsDifference = team.values[1].value;
    const $gamesWon = parseInt(team.values[4].value);
    const $gamesEven = parseInt(team.values[5].value);
    const $gamesLost = parseInt(team.values[6].value);
    const [goalsFor, goalsAgainst] = $goalsDifference.split(":");
    const goalsDifference = Number(goalsFor) - Number(goalsAgainst);
    const liveData = team.live_data;
    const hasObservations = $name.at(-1) === "*";
    const name = hasObservations ? $name.slice(0, -1) : $name;
    return {
      name,
      group,
      totalPoints: $totalPoints,
      playedMatches: $playedMatches,
      goalsDifference,
      gamesWon: $gamesWon,
      gamesEven: $gamesEven,
      gamesLost: $gamesLost,
      img: $img,
      ...liveData && { liveData }
    };
  });
};
const extractActualData = (extractedData) => {
  const groupA = transformTeamData(extractedData.groupA, "A");
  const groupB = transformTeamData(extractedData.groupB, "B");
  return [...groupA, ...groupB];
};

const extractAnnualData = (extractedData) => {
  return extractedData.map((team) => {
    const $name = team.entity.object.short_name;
    const $points = parseInt(
      team.values.find((val) => val.key === "Points")?.value ?? "0"
    );
    const $gamePlayed = parseInt(
      team.values.find((val) => val.key === "GamePlayed")?.value ?? "0"
    );
    return {
      name: $name,
      annualPoints: $points,
      yearGamePlayed: $gamePlayed
    };
  });
};

const extractAverageData = (extractedData) => {
  return extractedData.map((team) => {
    const $name = team.entity.object.short_name;
    const $previousSeasonsPoints = parseInt(team.values[3].value) + parseInt(team.values[4].value);
    const $avgTotalGames = parseInt(team.values[1].value);
    return {
      name: $name,
      previousSeasonsPoints: $previousSeasonsPoints,
      avgTotalGames: $avgTotalGames
    };
  });
};

const findAverageTable = (tablesGroups) => {
  return tablesGroups.find(
    (table) => table.tables[0].name.toLowerCase().includes("promedio")
  )?.tables[0].table.rows || [];
};
const findAnnualTable = (tablesGroups) => {
  return tablesGroups.find(
    (table) => table.tables[0].name.toLowerCase().includes("anual")
  )?.tables[0].table.rows || [];
};
const findActualTable = (tablesGroups, keyword) => {
  const matchingTable = tablesGroups.find(
    (table) => table.name.toLowerCase().includes(keyword)
  );
  if (!matchingTable) {
    throw new Error(
      `No se encontró una tabla que contenga la palabra "${keyword}".`
    );
  }
  const [groupA, groupB] = matchingTable.tables;
  return {
    groupA: groupA.table.rows,
    groupB: groupB.table.rows
  };
};

const getExternalInfo = async (URL) => {
  const { data } = await axios.get(URL);
  if (!data) throw new Error("No se pudo extraer el contenido de la página.");
  const tablesGroups = data.tables_groups;
  const extractedActualTable = findActualTable(tablesGroups, "clausura");
  const extractedAverages = findAverageTable(tablesGroups);
  const extractedAnnualTable = findAnnualTable(tablesGroups);
  return {
    extractedActualTable,
    extractedAverages,
    extractedAnnualTable
  };
};

const main = async () => {
  const { extractedActualTable, extractedAverages, extractedAnnualTable } = await getExternalInfo(config.api.URL);
  const actualTableData = extractActualData(extractedActualTable);
  const averageTableData = extractAverageData(extractedAverages);
  const annualTableData = extractAnnualData(extractedAnnualTable);
  return calculateTotal(actualTableData, averageTableData, annualTableData);
};

class Prediction {
  static async getFullPrediction() {
    return main();
  }
  static async getPredictionByPosition(position) {
    const prediction = await main();
    const result = prediction.find(
      (team) => team.predictions.position === position
    );
    if (!result) {
      throw new CustomError(
        "You must provide a valid position from 1 to 28",
        400,
        "Bad Request"
      );
    }
    return result;
  }
  static async getPredictionByTeamName(teamName) {
    const prediction = await main();
    const result = prediction.filter(
      (team) => team.teamInfo.name.toLowerCase().includes(teamName.toLowerCase())
    );
    if (result.length === 0) {
      throw new CustomError(
        "You must provide a valid team name",
        400,
        "Bad Request"
      );
    }
    return result;
  }
  static async getTeamsInClassification(classification) {
    const prediction = await main();
    const result = prediction.filter(
      (team) => team.predictions.classification.toLowerCase().includes(classification.toLowerCase())
    );
    if (result.length === 0) {
      throw new CustomError(
        "You must provide a valid classification: 'Libertadores', 'Sudamericana', 'noClasificado', 'descensoPorTabla' o 'descensoPromedios'",
        400,
        "Bad Request"
      );
    }
    return result;
  }
}

const getPrediction = async (authHeader, params) => {
  const hasParams = Object.values(params).some((param) => param !== void 0);
  if (hasParams) {
    const token = isValidBearerToken(authHeader);
    if (!token) {
      throw new CustomError(
        "You are not authorized to access this resource",
        401,
        "Unauthorized"
      );
    }
    try {
      const decodedToken = await verifyToken(token);
      if (!decodedToken) {
        throw new CustomError(
          "You are not authorized to access this resource",
          401,
          "Unauthorized"
        );
      }
    } catch (error) {
      if (error.message === "Token expired") {
        throw new CustomError(
          "Token has expired. Please obtain a new token.",
          401,
          "Unauthorized"
        );
      }
      if (error.message === "Invalid token") {
        throw new CustomError("Invalid token provided.", 401, "Unauthorized");
      }
      throw new CustomError(
        "Token validation failed. Please obtain a new token.",
        401,
        "Unauthorized"
      );
    }
    const { position, name, classification } = params;
    if (name) {
      return await Prediction.getPredictionByTeamName(name);
    }
    if (classification) {
      return await Prediction.getTeamsInClassification(classification);
    }
    if (position) {
      return await Prediction.getPredictionByPosition(parseInt(position));
    }
    throw new CustomError("Invalid parameters", 400, "Bad Request");
  }
  return await Prediction.getFullPrediction();
};

const OPTIONS = async () => handleOptionsRequest();
const GET = async ({ request }) => {
  const urlParams = new URL(request.url);
  const params = new URLSearchParams(urlParams.search);
  const allowedParams = ["position", "name", "classification"];
  const providedParams = Array.from(params.keys());
  const invalidParams = providedParams.filter(
    (param) => !allowedParams.includes(param)
  );
  if (invalidParams.length > 0) {
    return createCorsResponse(
      JSON.stringify({
        error: `Invalid parameter(s): ${invalidParams.join(
          ", "
        )}. Allowed parameters are: ${allowedParams.join(", ")}`
      }),
      400
    );
  }
  const paramsObject = Object.fromEntries(params);
  const authHeader = request.headers.get("Authorization");
  try {
    const data = await getPrediction(authHeader, paramsObject);
    return createCorsResponse(JSON.stringify(data), 200);
  } catch (error) {
    return createCorsResponse(
      JSON.stringify({ error: error.message }),
      error.status || 500
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  OPTIONS
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
