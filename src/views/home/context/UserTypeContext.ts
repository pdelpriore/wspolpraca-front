import { createContext } from "react";
import { MutableRefObject } from "react";
import { IHandleVisibilityParams } from "../../../hooks/visibility/useVisibility";
import { IGoogleAuth } from "../components/userTypeSnackbar/withUserTypeSnackbar";

type TShowUserFormSnackbar = (params: IHandleVisibilityParams) => void;

interface IUserTypeContext {
  userType: string;
  showUserTypeSnackbar: TShowUserFormSnackbar;
  ref: MutableRefObject<IGoogleAuth>;
}

export const UserTypeContext = createContext({} as IUserTypeContext);
