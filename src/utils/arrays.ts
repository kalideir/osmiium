export function arrayFromT<T>(size: number, filler: (index: number) => T): T[] {
  return Array(size)
    .fill(null)
    .map<T>((_, index) => filler(index));
}

export function shuffle<T>(array: T[]): T[] {
  return array.slice().sort(() => Math.random() - 0.5);
}

export function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]; // math.random -> 0 - 1
}

export function removeDuplicates<T>(array: T[], existsFn: (array: T[], item: T) => boolean): T[] {
  return array.reduce<T[]>((acc, curr) => {
    !existsFn(acc, curr) && acc.push(curr);
    return acc;
  }, []);
}
