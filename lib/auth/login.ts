"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "~/lib/pocketbase/server";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || typeof email !== "string") {
    throw new Error("cannot read email");
  } else if (!password || typeof password !== "string") {
    throw new Error("cannot read password");
  }

  const client = createServerClient();
  const user = await client
    .collection("users")
    .authWithPassword(email, password);

  const authCookie = client.authStore.exportToCookie();
  cookies().set("pb_auth", authCookie);

  redirect("/account");
}
