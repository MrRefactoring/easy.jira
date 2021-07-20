export abstract class BaseDTO<T extends object> {
  protected setData(data: Partial<T>): void {
    Object.keys(data).forEach((key) => {
      if (this.hasOwnProperty(key)) {
        // @ts-ignore
        this[key] = data[key];
      }
    });
  }

  protected removeData(): void {
    const data = (Object.entries(this) as [string, any])
      .map(([key]) => [key, undefined])
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    this.setData(data);
  }
}
