"use client";

import * as React from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error("Unhandled runtime error captured by error boundary:", error);
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center py-16 md:py-24">
      <Container className="max-w-md text-center">
        <div className="flex flex-col items-center">
          {/* Error Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400 mb-6 shadow-sm ring-1 ring-red-200 dark:ring-red-900/50">
            <AlertCircle className="h-7 w-7" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Something went wrong
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            An unexpected error occurred while processing your request. Please try again or return to the homepage.
          </p>

          {/* Error Digest (if available) */}
          {error.digest && (
            <p className="mt-2 text-xs font-mono text-zinc-400 dark:text-zinc-500">
              Error Digest: {error.digest}
            </p>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Button
              onClick={() => reset()}
              className="w-full sm:w-auto gap-2"
            >
              <RotateCcw className="h-4 w-4" /> Try Again
            </Button>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full sm:w-auto gap-2"
              )}
            >
              <Home className="h-4 w-4" /> Return Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
