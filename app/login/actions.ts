"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export type LoginState = {
  error: string;
};

export async function authenticate(
  previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  void previousState;

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(
    formData.get("callbackUrl") ?? ""
  );

  if (!email || !password) {
    return {
      error: "Enter your email address and password.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo:
        callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")
          ? callbackUrl
          : "/login/redirect",
    });

    return {
      error: "",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error:
          error.type === "CredentialsSignin"
            ? "The email or password is incorrect."
            : "We could not sign you in. Please try again.",
      };
    }

    throw error;
  }
}
