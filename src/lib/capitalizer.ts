export function capitalize(source: string): string {
  const SKIP = ['amb', 'de', 'i', 'o'];
  return source.split(' ').map((word) => SKIP.indexOf(word) == -1 ? word.toUpperCase() : word).join(' ');
}