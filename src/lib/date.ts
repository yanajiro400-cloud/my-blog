export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${y.slice(2)}.${m}.${d}`;
}
