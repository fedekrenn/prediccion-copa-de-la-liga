import { describe, it, expect } from 'vitest'
import calculateClasification from '../src/utils/calculateClasification'

describe('calculateClasification', () => {
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
})
