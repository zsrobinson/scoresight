import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { ReactNode } from "react";
import { logout } from "~/lib/auth/logout";
import { createServerClient } from "~/lib/pocketbase/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScoreSight",
  description: "The simple way to submit, manage, and grade assignments.",
};

export default async function Layout({ children }: { children: ReactNode }) {
  const client = createServerClient(cookies());
  const user = client.authStore;

  return (
    <html lang="en">
      <body className="m-8">
        <nav className="pb-4">
          <h1 className="font-bold text-2xl">ScoreSight</h1>

          <div>
            <Link href="/" className="text-blue-600 underline">
              Home
            </Link>{" "}
            |{" "}
            <Link href="/account" className="text-blue-600 underline">
              Account
            </Link>
          </div>

          {user.isValid ? (
            <form action={logout}>
              <span>Hey {user.model?.username},</span>{" "}
              <button className="text-blue-600 underline" type="submit">
                logout
              </button>
            </form>
          ) : (
            <>
              <span>Hey guest, </span>
              <Link href="/login" className="text-blue-600 underline">
                login
              </Link>{" "}
              or{" "}
              <Link href="/register" className="text-blue-600 underline">
                register
              </Link>
            </>
          )}
        </nav>

        {children}
      </body>
    </html>
  );
}
