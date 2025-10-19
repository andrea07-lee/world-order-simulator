export function normalizeValue(val: number, max: number, inverse: boolean = false): number {
    if (inverse) return Math.min((max / val) * 100, 100);
    return Math.min((val / max) * 100, 100);
  }
  