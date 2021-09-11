import { ErrorMap } from "@firebase/util";

export enum TAuthError {
  EMAIL_ALREADY_IN_USE = "auth/email-already-in-use",
  INVALID_EMAIL = "auth/invalid-email",
  INVALID_EMAIL_VERIFIED = "auth/invalid-email-verified",
  INVALID_PASSWORD = "auth/invalid-password",
  USER_NOT_FOUND = "auth/user-not-found",
}

export const firebaseAuthError: ErrorMap<TAuthError> = {
  [TAuthError.EMAIL_ALREADY_IN_USE]: "użytkownik jest już zarejestrowany",
  [TAuthError.INVALID_EMAIL]: "nieprawidłowy email",
  [TAuthError.INVALID_EMAIL_VERIFIED]: "email nie zweryfikowany",
  [TAuthError.INVALID_PASSWORD]: "nieprawidłowe hasło",
  [TAuthError.USER_NOT_FOUND]: "użytkownik nie istnieje",
};
