import { describe, it, expect } from 'vitest'
import calculateClasification from '../src/utils/calculateClasification'
import calculatePartial from '../src/utils/calculatePartial';

describe('---- Calculate future table ----', () => {
  it('Should calculate correct position', () => {
    expect(calculateClasification(1, false)).toBe('libertadores');
    expect(calculateClasification(2, false)).toBe('libertadores');
    expect(calculateClasification(3, false)).toBe('libertadores');
    expect(calculateClasification(4, false)).toBe('sudamericana');
    expect(calculateClasification(5, false)).toBe('sudamericana');
    expect(calculateClasification(6, false)).toBe('sudamericana');
    expect(calculateClasification(7, false)).toBe('sudamericana');
    expect(calculateClasification(8, false)).toBe('sudamericana');
    expect(calculateClasification(9, false)).toBe('sudamericana');
    expect(calculateClasification(28, false)).toBe('descensoPorTabla');
    expect(calculateClasification(10, false)).toBe('noClasificado');
    expect(calculateClasification(27, false)).toBe('noClasificado');
    expect(calculateClasification(29, false)).toBe('noClasificado');
    expect(calculateClasification(0, false)).toBe('noClasificado');
    expect(calculateClasification(9, true)).toBe('descensoPromedios');
  });

  it('Should calculate correct partial prediction', () => {
    const arrayEquipos = [
      { name: 'River', totalPoints: 24, playedMatches: 13, goalsDifference: 14 },
      { name: 'Boca', totalPoints: 22, playedMatches: 12, goalsDifference: 8 },
      { name: 'Racing', totalPoints: 21, playedMatches: 13, goalsDifference: 9 },
      { name: 'Independiente', totalPoints: 22, playedMatches: 13, goalsDifference: 4 },
      { name: 'San Lorenzo', totalPoints: 15, playedMatches: 13, goalsDifference: -4 },
      { name: 'Huracan', totalPoints: 13, playedMatches: 13, goalsDifference: -4 },
      { name: 'Estudiantes', totalPoints: 21, playedMatches: 12, goalsDifference: 8 },
      { name: 'Instituto', totalPoints: 17, playedMatches: 13, goalsDifference: 3 }
    ]

    const prediction = [
      { name: 'River', effectivityPorcentage: 62, estimatedTotalPoints: 26 },
      { name: 'Boca', effectivityPorcentage: 61, estimatedTotalPoints: 27 },
      { name: 'Racing', effectivityPorcentage: 54, estimatedTotalPoints: 23 },
      { name: 'Independiente', effectivityPorcentage: 56, estimatedTotalPoints: 24 },
      { name: 'San Lorenzo', effectivityPorcentage: 38, estimatedTotalPoints: 16 },
      { name: 'Huracan', effectivityPorcentage: 33, estimatedTotalPoints: 14 },
      { name: 'Estudiantes', effectivityPorcentage: 58, estimatedTotalPoints: 26 },
      { name: 'Instituto', effectivityPorcentage: 44, estimatedTotalPoints: 18 }
    ]

    expect(calculatePartial(arrayEquipos)).toEqual(prediction);
  })
})
