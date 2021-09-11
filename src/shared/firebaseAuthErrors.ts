import { ErrorMap } from "@firebase/util";

export const enum authErrorType {
  EMAIL_ALREADY_EXISTS = "auth/email-already-exists",
  INVALID_EMAIL = "auth/invalid-email",
  INVALID_EMAIL_VERIFIED = "auth/invalid-email-verified",
  INVALID_PASSWORD = "auth/invalid-password",
  USER_NOT_FOUND = "auth/user-not-found",
}

export const firebaseAuthError: ErrorMap<authErrorType> = {
  [authErrorType.EMAIL_ALREADY_EXISTS]: "użytkownik jest już zarejestrowany",
  [authErrorType.INVALID_EMAIL]: "nieprawidłowy email",
  [authErrorType.INVALID_EMAIL_VERIFIED]: "email nie zweryfikowany",
  [authErrorType.INVALID_PASSWORD]: "nieprawidłowe hasło",
  [authErrorType.USER_NOT_FOUND]: "użytkownik nie istnieje",
};
