import { makeVar } from "@apollo/client";

interface IMessage {
  title?: string;
  message?: string;
  variant?: string;
}

const showMessage = makeVar({} as IMessage);

export default showMessage;
