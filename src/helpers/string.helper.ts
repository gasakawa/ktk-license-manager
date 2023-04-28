export class StringHelper {
  static reverse(str: string): string {
    return str.split('').reverse().join('');
  }
}
