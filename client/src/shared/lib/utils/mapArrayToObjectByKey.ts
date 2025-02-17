export const mapArrayToObjectByKey = <
  T extends { [key: string | number | symbol]: any },
  K extends keyof T,
>(
  array: T[],
  key: K,
): Record<T[K], T> => {
  const result = {} as Record<T[K], T>;
  array.forEach((item) => {
    if (!result[item[key]]) {
      result[item[key]] = item;
    }
  });
  return result;
};
