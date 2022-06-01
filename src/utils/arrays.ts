export function arrayFromT<T>(size: number, filler: () => T): T[] {
  return Array(size)
    .fill(null)
    .map<T>(() => filler());
}

export function shuffle<T>(array: T[]): T[] {
  return array.splice(0).sort(() => Math.random() - 0.5);
}

export function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]; // math.random -> 0 - 1
}
