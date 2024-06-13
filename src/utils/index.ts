export function pick<T extends Record<string, any>, V extends keyof T>(
  obj: T,
  keys: V[],
): Partial<{ [v in V]: T[v] }> {
  const newObj: Partial<{ [v in V]: T[v] }> = {};
  for (const key of keys) {
    if (key in obj) newObj[key] = obj[key];
  }
  return newObj;
}
