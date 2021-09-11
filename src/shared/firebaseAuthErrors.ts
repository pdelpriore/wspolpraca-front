import { ErrorMap } from "@firebase/util";

export enum AuthError {
  EMAIL_ALREADY_IN_USE = "auth/email-already-in-use",
  INVALID_EMAIL = "auth/invalid-email",
  INVALID_EMAIL_VERIFIED = "auth/invalid-email-verified",
  INVALID_PASSWORD = "auth/invalid-password",
  WEAK_PASSWORD = "auth/weak-password",
  USER_NOT_FOUND = "auth/user-not-found",
}

export const firebaseAuthError: ErrorMap<AuthError> = {
  [AuthError.EMAIL_ALREADY_IN_USE]: "Użytkownik jest już zarejestrowany",
  [AuthError.INVALID_EMAIL]: "Nieprawidłowy email",
  [AuthError.INVALID_EMAIL_VERIFIED]: "Email nie zweryfikowany",
  [AuthError.INVALID_PASSWORD]: "Nieprawidłowe hasło",
  [AuthError.WEAK_PASSWORD]: "Za słabe hasło",
  [AuthError.USER_NOT_FOUND]: "Użytkownik nie istnieje",
};
