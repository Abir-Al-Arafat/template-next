import Link from "next/link";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center py-16 md:py-24">
      <Container className="max-w-md text-center">
        <div className="flex flex-col items-center">
          {/* 404 Icon & Badge */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 mb-6 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700">
            <FileQuestion className="h-7 w-7" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            404 Error
          </span>

          {/* Heading */}
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Sorry, we couldn’t find the page you’re looking for. It may have been moved, deleted, or never existed.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full sm:w-auto gap-2"
              )}
            >
              <Home className="h-4 w-4" /> Back to Home
            </Link>
            <Link
              href="/#features"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "w-full sm:w-auto gap-2"
              )}
            >
              <ArrowLeft className="h-4 w-4" /> Explore Features
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
