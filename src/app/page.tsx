import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Zap,
  ShieldCheck,
  Layers,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  LogIn,
  UserPlus,
} from "lucide-react";
import { getCurrentUserAction } from "@/actions/auth";
import {
  buttonVariants,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Container,
} from "@/components/ui";
import { UserCard } from "@/components/shared";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Zap,
    title: "Optimized Performance",
    description:
      "Built on React 19 and Next.js App Router with server-first rendering, streaming, and minimal bundle sizes.",
    details: [
      "Server Components by default",
      "Automatic code splitting",
      "Turbopack-powered fast refresh",
    ],
    href: "https://nextjs.org/docs/app",
  },
  {
    icon: ShieldCheck,
    title: "End-to-End Type Safety",
    description:
      "Strict TypeScript definitions with validated environment variables and typed API helpers.",
    details: [
      "Zero `any` policy",
      "Zod-validated runtime env",
      "Centralized type declarations",
    ],
    href: "https://www.typescriptlang.org/docs/",
  },
  {
    icon: Layers,
    title: "Atomic UI Primitives",
    description:
      "Accessible, modular UI components styled with Tailwind CSS and class-variance-authority.",
    details: [
      "Headless-compatible structure",
      "Responsive fluid layouts",
      "Dark & light theme support",
    ],
    href: "https://cva.style/docs",
  },
];

export default async function Home() {
  const user = await getCurrentUserAction();

  return (
    <div className="flex flex-col flex-1">
      {/* Hero / Authenticated User Section */}
      <section className="py-16 md:py-24 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900/50 border-b border-zinc-200/80 dark:border-zinc-800/80">
        <Container className="flex flex-col items-center text-center">
          {user ? (
            <div className="w-full max-w-xl flex flex-col items-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-medium text-emerald-800 shadow-xs dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-300 mb-6">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Authenticated Session</span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl md:text-5xl mb-4">
                Welcome back, {user.name}
              </h1>

              <p className="max-w-md text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-8">
                You are currently signed in. Here is your profile information and active session details.
              </p>

              <div className="w-full text-left">
                <UserCard user={user} className="w-full shadow-lg border-zinc-200/80 dark:border-zinc-800" />
              </div>
            </div>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1 text-xs font-medium text-zinc-800 shadow-xs dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 mb-6">
                <Sparkles className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
                <span>Next.js Starter Template</span>
              </div>

              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl">
                Build production-ready web applications with precision
              </h1>

              <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                A production-grade Next.js foundation featuring modular architecture,
                atomic UI primitives, strict TypeScript configuration, and modern design standards.
              </p>

              {/* Logged-out Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/register"
                  className={cn(buttonVariants({ variant: "default", size: "lg" }))}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Create Account</span>
                </Link>
                <Link
                  href="/login"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
                <Link
                  href="#features"
                  className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
                >
                  <span>Explore Features</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          )}
        </Container>
      </section>

      {/* Feature Grid Section */}
      <section
        id="features"
        className="py-16 md:py-24 bg-zinc-50/50 dark:bg-zinc-900/30"
      >
        <Container>
          <div className="text-center max-w-xl mx-auto mb-12 md:mb-16">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              Engineered for developer experience
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Essential primitives and architectural foundations configured out of the box.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="flex flex-col justify-between transition-shadow hover:shadow-md"
                >
                  <div>
                    <CardHeader>
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 mb-3">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed mt-1">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
                        {feature.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300 shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </div>
                  <CardFooter className="pt-2">
                    <Link
                      href={feature.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="ghost" size="sm" className="w-full justify-between">
                        <span>Read Documentation</span>
                        <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Call-To-Action Block */}
      <section className="py-16 md:py-24 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <Container>
          <Card className="relative overflow-hidden border-zinc-200 dark:border-zinc-800 bg-zinc-900 text-white dark:bg-zinc-900">
            <div className="p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-center md:text-left space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {user ? "Explore the full architecture" : "Ready to start building?"}
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {user
                    ? "Check out the modular code structure, server actions, and reusable UI primitives."
                    : "Get up and running in seconds. Clone the repository, install dependencies, and kick off your next project."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                {user ? (
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "lg" }),
                      "w-full sm:w-auto"
                    )}
                  >
                    <Code2 className="h-4 w-4" /> View Source
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/register"
                      className={cn(
                        buttonVariants({ variant: "secondary", size: "lg" }),
                        "w-full sm:w-auto"
                      )}
                    >
                      Get Started Now
                    </Link>
                    <Link
                      href="/login"
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "w-full sm:w-auto border-zinc-700 text-zinc-100 hover:bg-zinc-800 hover:text-white"
                      )}
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
}
