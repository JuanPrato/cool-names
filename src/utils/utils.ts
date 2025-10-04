export function toggleValue<T>(arr: T[], val: T): T[] {
  if (arr.includes(val)) {
    return arr.filter((item: T) => item !== val);
  } else {
    return [...arr, val];
  }
}
