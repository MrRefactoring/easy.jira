export abstract class BaseDTO<T extends object> {
  protected setData(data: Partial<T>, schema: T): void {
    Object.keys(data).forEach((key) => {
      if (schema.hasOwnProperty(key)) {
        // @ts-ignore
        this[key] = data[key];
      }
    });
  }
}
