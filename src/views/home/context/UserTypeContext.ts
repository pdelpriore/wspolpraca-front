import { createContext } from "react";
import { MutableRefObject } from "react";
import { IHandleVisibilityParams } from "../../../hooks/visibility/useVisibility";
import { IGoogleAuth } from "../components/userTypeSnackbar/withUserTypeSnackbar";

type TShowUserFormSnackbar = (params: IHandleVisibilityParams) => void;
type TSettingValue = (value: boolean) => void;

interface IUserTypeContext {
  userType: string;
  ref: MutableRefObject<IGoogleAuth>;
  showUserTypeSnackbar: TShowUserFormSnackbar;
  setSnackbarLoader: TSettingValue;
  setIsUserSignedup: TSettingValue;
}

export const UserTypeContext = createContext({} as IUserTypeContext);
