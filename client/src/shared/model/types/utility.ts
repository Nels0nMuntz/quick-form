export type OmitNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};

export type PartialByKeys<T extends object, U extends keyof T> = Omit<
  Partial<Pick<T, U & keyof T>> & Omit<T, U & keyof T>,
  never
>;
