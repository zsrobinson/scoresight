import { IconEyeglass2 } from "@tabler/icons-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { logout } from "~/lib/auth/logout";
import { createServerClient } from "~/lib/pocketbase/server";
import { Button } from "./ui/button";
import { NavLink } from "./navlink";

export function Navbar() {
  const client = createServerClient(cookies());

  return (
    <div className="border-b border-border bg-muted dark:bg-muted/30">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-3">
        <Link href="/" className="flex items-center gap-2">
          <IconEyeglass2 />
          <h1 className="text-xl font-bold leading-none">ScoreSight</h1>
        </Link>

        {client.authStore.isValid && (
          <nav className="flex gap-4">
            <NavLink href="/classes">Classes</NavLink>
            <NavLink href="/account">Account</NavLink>
          </nav>
        )}

        {client.authStore.isValid ? (
          <form action={logout}>
            <Button variant="outline" size="navbar" type="submit">
              Logout
            </Button>
          </form>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="navbar" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="outline" size="navbar" asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
