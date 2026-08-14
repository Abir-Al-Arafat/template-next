"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, Loader2, Lock, Mail, Sparkles } from "lucide-react";
import { loginAction } from "@/actions/auth";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
  Input,
  Label,
} from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({});
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    startTransition(async () => {
      try {
        const result = await loginAction({ email, password });

        if (!result.success) {
          setErrorMessage(result.message || "Failed to sign in. Please check your credentials.");
          if (result.errors) {
            setFieldErrors(result.errors);
          }
          return;
        }

        // On successful login, navigate to home and refresh server components
        router.push("/");
        router.refresh();
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : "An unexpected error occurred during login."
        );
      }
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col justify-center py-12 sm:px-6 lg:px-8 bg-zinc-50/50 dark:bg-zinc-950">
      <Container className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-md dark:bg-zinc-100 dark:text-zinc-900 mb-4">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Sign in to access your account dashboard
          </p>
        </div>

        <Card className="border-zinc-200/80 shadow-lg dark:border-zinc-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Sign in</CardTitle>
            <CardDescription>
              Enter your email and password to continue
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit} noValidate>
            <CardContent className="space-y-4">
              {errorMessage && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50/70 p-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span className="leading-tight">{errorMessage}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" required>
                  Email address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isPending}
                    error={Boolean(fieldErrors.email?.length)}
                    className="pl-9"
                  />
                  <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                </div>
                {fieldErrors.email?.[0] && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {fieldErrors.email[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" required>
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isPending}
                    error={Boolean(fieldErrors.password?.length)}
                    className="pl-9"
                  />
                  <Lock className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                </div>
                {fieldErrors.password?.[0] && (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {fieldErrors.password[0]}
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full gap-2"
                size="lg"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
                >
                  Create an account
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </Container>
    </div>
  );
}
