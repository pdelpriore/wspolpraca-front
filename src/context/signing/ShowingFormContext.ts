import { createContext } from "react";

type TShowForm = (component: string) => void;

interface IShowingFormContext {
  showForm: TShowForm;
}

export const ShowingFormContext = createContext({} as IShowingFormContext);
