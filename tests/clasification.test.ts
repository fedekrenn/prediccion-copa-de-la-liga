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
      { nombre: 'River', puntosTotales: 24, partidosJugados: 13, diferenciaGoles: 14 },
      { nombre: 'Boca', puntosTotales: 22, partidosJugados: 12, diferenciaGoles: 8 },
      { nombre: 'Racing', puntosTotales: 21, partidosJugados: 13, diferenciaGoles: 9 },
      { nombre: 'Independiente', puntosTotales: 22, partidosJugados: 13, diferenciaGoles: 4 },
      { nombre: 'San Lorenzo', puntosTotales: 15, partidosJugados: 13, diferenciaGoles: -4 },
      { nombre: 'Huracan', puntosTotales: 13, partidosJugados: 13, diferenciaGoles: -4 },
      { nombre: 'Estudiantes', puntosTotales: 21, partidosJugados: 12, diferenciaGoles: 8 },
      { nombre: 'Instituto', puntosTotales: 17, partidosJugados: 13, diferenciaGoles: 3 }
    ]

    const prediction = [
      { nombre: 'River', porcentajeActual: 62, puntosEstimados: 76 },
      { nombre: 'Boca', porcentajeActual: 61, puntosEstimados: 75 },
      { nombre: 'Racing', porcentajeActual: 54, puntosEstimados: 66 },
      { nombre: 'Independiente', porcentajeActual: 56, puntosEstimados: 69 },
      { nombre: 'San Lorenzo', porcentajeActual: 38, puntosEstimados: 47 },
      { nombre: 'Huracan', porcentajeActual: 33, puntosEstimados: 41 },
      { nombre: 'Estudiantes', porcentajeActual: 58, puntosEstimados: 71 },
      { nombre: 'Instituto', porcentajeActual: 44, puntosEstimados: 54 }
    ]

    expect(calculatePartial(arrayEquipos)).toEqual(prediction);
  })
})
