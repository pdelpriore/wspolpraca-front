export interface IUser {
  id: number;
  userType: string;
  name: string;
  email: string;
  picture: string;
}

export interface IUserParams {
  email: string;
}
