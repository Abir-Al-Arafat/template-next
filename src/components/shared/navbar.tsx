"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brandName?: string;
  items?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
}

const defaultNavItems: NavItem[] = [
  { label: "Features", href: "/#features" },
  { label: "Documentation", href: "/docs" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
];

export function Navbar({
  brandName = "TemplateNext",
  items = defaultNavItems,
  ctaLabel = "Get Started",
  ctaHref = "/signup",
  className,
  ...props
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80",
        className
      )}
      {...props}
    >
      <Container className="flex h-16 items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-zinc-900 transition-colors hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
          aria-label={`${brandName} Home`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            {brandName}
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Main Navigation"
        >
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-100",
                  isActive
                    ? "text-zinc-900 dark:text-zinc-100 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA Action Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Sign In
          </Link>
          <Link
            href={ctaHref}
            className={cn(buttonVariants({ variant: "default", size: "sm" }))}
          >
            {ctaLabel}
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </Container>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-zinc-200 bg-white/95 px-4 py-6 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95 md:hidden">
          <nav className="flex flex-col space-y-4" aria-label="Mobile Navigation">
            {items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "text-base font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-100",
                    isActive
                      ? "text-zinc-900 dark:text-zinc-100 font-semibold"
                      : "text-zinc-600 dark:text-zinc-400"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 flex flex-col gap-2 border-t border-zinc-200 dark:border-zinc-800">
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center")}
              >
                Sign In
              </Link>
              <Link
                href={ctaHref}
                onClick={closeMobileMenu}
                className={cn(buttonVariants({ variant: "default" }), "w-full justify-center")}
              >
                {ctaLabel}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
