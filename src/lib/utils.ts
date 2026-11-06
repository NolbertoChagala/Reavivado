export function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-MX").format(value);
}