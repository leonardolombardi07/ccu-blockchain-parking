export function getNumBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getIntBetween(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
