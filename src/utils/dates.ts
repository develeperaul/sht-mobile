export function prettyDate(date: string) {
  const parts = date.split('T')[0]?.split('-');
  if(!parts) return '-';
  const [year, month, day] = parts;
  return `${day}.${month}.${year}`;
}
