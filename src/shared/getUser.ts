import { makeVar } from "@apollo/client";

export interface IReactiveUser {
  id: string;
  userType: string;
  name: string;
  email: string;
  picture?: string;
}

const getUser = makeVar(JSON.parse(localStorage.getItem("user") as string));

export default getUser;
