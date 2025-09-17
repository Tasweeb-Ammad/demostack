"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuthFrontendApis } from "@propelauth/frontend-apis-react";
import { useState } from "react";
import { LoginState } from "@propelauth/frontend-apis";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { emailPasswordLogin } = useAuthFrontendApis();

  const handleSignIn = async () => {
    setError(null);
    setSubmitting(true);

    try {
      const res = await emailPasswordLogin({ email, password });
      await res.handle({
        async success({ login_state }) {
          if (login_state === LoginState.LOGGED_IN) {
            router.replace("/");
            return;
          }
        },
        invalidCredentials(_err) {
          setError("Incorrect email or password.");
        },
        badRequest(err) {
          // Field-level errors, e.g. malformed email
          setError(
            Object.values(err.user_facing_errors || {}).join(", ") ||
              "Please check your input."
          );
        },
        unexpectedOrUnhandled(err) {
          setError(err.user_facing_error || "Something went wrong.");
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className=" min-h-svh w-full flex justify-center items-center">
      <div className="w-1/4">
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link">Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full cursor-pointer"
              onClick={handleSignIn}
            >
              {submitting ? "Logging In" : "Login"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
