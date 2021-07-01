export abstract class BaseDTO<T> {
  protected setData(data: Partial<T>): void {
    Object.keys(data).forEach((key) => {
      if (this.hasOwnProperty(key)) {
        // @ts-ignore
        this[key] = data[key];
      }
    });
  }
}
