import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="flex flex-1 flex-col justify-center py-16 md:py-24"
    >
      <span className="sr-only">Loading page content...</span>
      <Container className="space-y-12">
        {/* Hero Skeleton */}
        <div className="flex flex-col items-center space-y-4 text-center">
          {/* Badge Skeleton */}
          <div className="h-6 w-32 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          {/* Title Skeleton */}
          <div className="h-10 w-3/4 max-w-xl rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          <div className="h-10 w-1/2 max-w-md rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          {/* Subtitle Skeleton */}
          <div className="h-4 w-2/3 max-w-lg rounded bg-zinc-200/70 dark:bg-zinc-800/70 animate-pulse mt-2" />
          {/* Actions Skeleton */}
          <div className="flex gap-4 pt-4">
            <div className="h-11 w-32 rounded-lg bg-zinc-300 dark:bg-zinc-700 animate-pulse" />
            <div className="h-11 w-36 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          </div>
        </div>

        {/* Content Cards Skeleton Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 pt-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-4"
            >
              <div className="h-10 w-10 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
              <div className="h-5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
              <div className="space-y-2">
                <div className="h-3.5 w-full rounded bg-zinc-200/70 dark:bg-zinc-800/70 animate-pulse" />
                <div className="h-3.5 w-4/5 rounded bg-zinc-200/70 dark:bg-zinc-800/70 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
