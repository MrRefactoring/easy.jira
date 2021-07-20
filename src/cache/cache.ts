import { Context } from '../context';

export class Cache extends Map {
  private expiring = new Map<string, Date | undefined>();

  constructor(private context: Context) {
    super();
  }

  has(key: string): boolean {
    if (this.isExpired(key)) {
      return false;
    }

    return super.has(key);
  }

  get<T>(key: string): T | undefined {
    if (this.isExpired(key)) {
      return undefined;
    }

    return super.get(key);
  }

  set(key: string, value: any, expireIn?: string): this {
    this.expiring.set(key, expireIn ? this.expireToDate(expireIn) : undefined);
    super.set(key, value);

    return this;
  }

  private isExpired(key: string): boolean {
    if (this.expiring.has(key)) {
      const expire = this.expiring.get(key);

      if (expire) {
        if (expire > new Date()) {
          return false;
        }

        this.delete(key);

        return true;
      }
    }

    return false;
  }

  private expireToDate(expireIn: string): Date {
    const expire = expireIn.split(' ')
      .map((chip) => chip.trim());

    const secondExpire = +(expire.find((chip) => chip.endsWith('s'))?.slice(0, -1) ?? 0);
    const minuteExpire = +(expire.find((chip) => chip.endsWith('m'))?.slice(0, -1) ?? 0);
    const hoursExpire = +(expire.find((chip) => chip.endsWith('h'))?.slice(0, -1) ?? 0);
    const dayExpire = +(expire.find((chip) => chip.endsWith('d'))?.slice(0, -1) ?? 0);
    const monthExpire = +(expire.find((chip) => chip.endsWith('M'))?.slice(0, -1) ?? 0);
    const yearExpire = +(expire.find((chip) => chip.endsWith('y'))?.slice(0, -1) ?? 0);

    const expireDate = new Date();

    expireDate.setSeconds(expireDate.getSeconds() + secondExpire);
    expireDate.setMinutes(expireDate.getMinutes() + minuteExpire);
    expireDate.setHours(expireDate.getHours() + hoursExpire + (24 * dayExpire));
    expireDate.setMonth(expireDate.getMonth() + monthExpire + (12 * yearExpire));

    return expireDate;
  }
}
