import { createContext } from "react";
import { IHandleVisibilityParams } from "../../hooks/visibility/useVisibility";

type TShowForm = (params: IHandleVisibilityParams) => void;

interface IShowingFormContext {
  showForm: TShowForm;
}

export const ShowingFormContext = createContext({} as IShowingFormContext);
