"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import {
  authenticate,
  type LoginState,
} from "@/app/login/actions";

const initialState: LoginState = {
  error: "",
};

type LoginFormProps = {
  callbackUrl: string;
};

export default function LoginForm({
  callbackUrl,
}: LoginFormProps) {
  const [state, formAction] = useActionState(
    authenticate,
    initialState
  );

  return (
    <form action={formAction} style={styles.form}>
      <input
        type="hidden"
        name="callbackUrl"
        value={callbackUrl}
      />

      <label style={styles.field}>
        <span style={styles.label}>Email address</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          style={styles.input}
        />
      </label>

      <label style={styles.field}>
        <span style={styles.label}>Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Enter your password"
          style={styles.input}
        />
      </label>

      {state.error ? (
        <div role="alert" style={styles.error}>
          {state.error}
        </div>
      ) : null}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        ...styles.button,
        opacity: pending ? 0.7 : 1,
        cursor: pending ? "wait" : "pointer",
      }}
    >
      {pending ? "Signing in…" : "Sign In"}
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: "grid",
    gap: "18px",
    marginTop: "30px",
  },
  field: {
    display: "grid",
    gap: "8px",
  },
  label: {
    color: "#0D1B3D",
    fontSize: "12px",
    fontWeight: 850,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #CBD5E1",
    borderRadius: "13px",
    background: "#FFFFFF",
    color: "#0D1B3D",
    fontSize: "15px",
    outline: "none",
    padding: "14px 16px",
  },
  error: {
    border: "1px solid #FCA5A5",
    borderRadius: "12px",
    background: "#FEF2F2",
    color: "#991B1B",
    fontSize: "12px",
    fontWeight: 700,
    lineHeight: 1.5,
    padding: "12px 14px",
  },
  button: {
    width: "100%",
    border: 0,
    borderRadius: "13px",
    background: "#F2B705",
    color: "#0D1B3D",
    fontSize: "13px",
    fontWeight: 900,
    padding: "15px 18px",
  },
};
