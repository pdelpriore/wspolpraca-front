import { makeVar } from "@apollo/client";

type message = {
  title?: string;
  message?: string;
  variant?: string;
};

const showMessage = makeVar({} as message);

export default showMessage;
