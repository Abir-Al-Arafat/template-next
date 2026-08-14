import * as React from "react";
import { LogOut, Mail, Calendar, ShieldCheck, User as UserIcon } from "lucide-react";
import { logoutAction } from "@/actions/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { User } from "@/types/api";

export interface UserCardProps {
  user: User;
  className?: string;
}

export function UserCard({ user, className }: UserCardProps) {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recent";

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-lg font-bold text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <CardTitle className="truncate text-xl">{user.name}</CardTitle>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
              <ShieldCheck className="h-3 w-3" />
              Verified
            </span>
          </div>
          <CardDescription className="truncate text-sm mt-0.5">
            {user.email}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-2">
        <div className="rounded-lg border border-zinc-100 bg-zinc-50/50 p-3 space-y-2 dark:border-zinc-800/80 dark:bg-zinc-900/30">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300">
              <UserIcon className="h-3.5 w-3.5 text-zinc-400" />
              Account ID
            </span>
            <span className="font-mono text-zinc-600 dark:text-zinc-400 select-all">
              {user.id}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300">
              <Mail className="h-3.5 w-3.5 text-zinc-400" />
              Email
            </span>
            <span className="text-zinc-600 dark:text-zinc-400 truncate max-w-[200px]">
              {user.email}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300">
              <Calendar className="h-3.5 w-3.5 text-zinc-400" />
              Joined
            </span>
            <span className="text-zinc-600 dark:text-zinc-400">
              {formattedDate}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <form action={logoutAction} className="w-full">
          <Button
            type="submit"
            variant="destructive"
            size="md"
            className="w-full gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
