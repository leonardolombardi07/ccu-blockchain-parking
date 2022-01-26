export function fromHoursAndMinutes(hours: number, minutes: number): Date {
  const newDate = new Date();
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  return newDate;
}

export function diffInMs(date1: Date, date2: Date): number {
  return date1.getTime() - date2.getTime();
}

export function diffInMinutes(date1: Date, date2: Date): number {
  return Math.abs(Math.round(diffInMs(date1, date2) / 60000));
}

export function humanReadable(date: Date): string {
  return `${prefix(date)} ${HH_MM(date)}`;
}

export function HH_MM(date: Date): string {
  return `${date.getHours()}:${date.getMinutes()}`;
}

export function prefix(date: Date): string {
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return DD_MM_YY(date);
}

export function DD_MM_YY(date: Date): string {
  const YY = String(date.getFullYear()).slice(-2);
  return `${date.getDate()}/${date.getMonth() + 1}/${YY}`;
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return isSameDay(date, today);
}

export function isTomorrow(date: Date): boolean {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return isSameDay(date, tomorrow);
}
