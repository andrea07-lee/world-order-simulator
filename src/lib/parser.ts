export function parseValue(val: string | number, key: string): number {
    if (typeof val === 'number') return val;
    if (typeof val !== 'string') return 0;
  
    let cleaned = val
      .replace(/,/g, '')
      .replace(/USD|%|\s|년|\$/gi, '')
      .replace(/억/g, 'e8')
      .replace(/조/g, 'e12')
      .replace(/\/hour/g, '');
  
    const match = cleaned.match(/([\d\.]+)e(\d+)/);
    if (match) {
      const [_, base, exp] = match;
      return parseFloat(base) * Math.pow(10, parseInt(exp));
    }
  
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }