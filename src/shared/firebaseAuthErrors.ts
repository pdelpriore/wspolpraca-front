import { ErrorMap } from "@firebase/util";

export enum AuthError {
  EMAIL_ALREADY_IN_USE = "auth/email-already-in-use",
  INVALID_EMAIL = "auth/invalid-email",
  INVALID_EMAIL_VERIFIED = "auth/invalid-email-verified",
  INVALID_PASSWORD = "auth/invalid-password",
  USER_NOT_FOUND = "auth/user-not-found",
}

export const firebaseAuthError: ErrorMap<AuthError> = {
  [AuthError.EMAIL_ALREADY_IN_USE]: "użytkownik jest już zarejestrowany",
  [AuthError.INVALID_EMAIL]: "nieprawidłowy email",
  [AuthError.INVALID_EMAIL_VERIFIED]: "email nie zweryfikowany",
  [AuthError.INVALID_PASSWORD]: "nieprawidłowe hasło",
  [AuthError.USER_NOT_FOUND]: "użytkownik nie istnieje",
};
