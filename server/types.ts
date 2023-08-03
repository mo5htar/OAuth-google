export interface IUser {
  id: String;
  email: string;
  name: string;
  password: string | undefined;
  pic: string;
  createdAt: Date;
  updatedAt: Date;
}
