export interface ResponseModel<T> {
  data: {
    id: number;
    attributes: T;
  };
}
