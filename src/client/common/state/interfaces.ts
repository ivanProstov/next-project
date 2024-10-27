export interface IStore<T extends Record<any, any>, A extends {}> {
  data: T;
  actions: A;
}
