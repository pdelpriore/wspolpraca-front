import { makeVar } from "@apollo/client";

const getUser = makeVar(JSON.parse(localStorage.getItem("user") as string));

export default getUser;
