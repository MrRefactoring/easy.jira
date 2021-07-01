export interface UserModel {
  id: string;
  active: boolean;

  email?: string;
  displayName?: string;
  timeZone?: string;
  locale?: string;
}
