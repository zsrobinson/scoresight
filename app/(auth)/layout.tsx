import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { createServerClient } from "~/lib/pocketbase/server";

export default function Layout({ children }: { children: ReactNode }) {
  const client = createServerClient(cookies());
  if (client.authStore.isValid) {
    redirect("/account");
  }

  return children;
}
