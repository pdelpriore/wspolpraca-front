import { makeVar } from "@apollo/client";

type error = {
  [key: string]: string;
};

const handleError = makeVar({} as error);

// updating error handler
// handleError({ ...handleError(), [newErrorType]: error })

export default handleError;
