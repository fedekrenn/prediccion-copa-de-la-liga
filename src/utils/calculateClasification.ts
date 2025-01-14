import type { TABLE_POSITIONS } from '@typos/teamPrediction'

type PositionTable = {
  [key: number]: TABLE_POSITIONS
}

export const calculateClasification = (position: number, isTeamRelegatedByAverages: boolean, isLastByTable: boolean): TABLE_POSITIONS => {

  if (isTeamRelegatedByAverages) return 'descensoPromedios'
  if (isLastByTable) return 'descensoPorTabla'

  const ranking: PositionTable = {
    1: 'libertadores',
    2: 'libertadores',
    3: 'libertadores',
    4: 'sudamericana',
    5: 'sudamericana',
    6: 'sudamericana',
    7: 'sudamericana',
    8: 'sudamericana',
    9: 'sudamericana',
    30: 'descensoPorTabla'
  };

  const finalClassification = ranking[position];

  return finalClassification ? finalClassification : 'noClasificado';
}