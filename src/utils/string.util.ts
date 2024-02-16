export class StringUtil {
  static capitalizeOnlyFirstChar(s?: string): string {
    if (typeof s !== 'string') {
      return '';
    }

    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  static isNumber(val?: any) {
    const num = val !== '' ? Number(val ?? undefined) : undefined;

    return num === 0 || !!num;
  }
}
