interface DataJson {
  [key: string]: any;
};

export interface Mapper<U> {
  (json: DataJson): U;
}
