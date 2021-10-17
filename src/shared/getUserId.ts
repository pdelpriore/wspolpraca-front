import { makeVar } from "@apollo/client";

export interface IReactiveUserId {
  userId: string;
}

const getUserId = makeVar(JSON.parse(localStorage.getItem("userId") as string));

export default getUserId;
