"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "~/lib/pocketbase/server";

export async function login(_: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || typeof email !== "string") {
    return { error: "Cannot read email." };
  } else if (!password || typeof password !== "string") {
    return { error: "Cannot read password." };
  }

  const client = createServerClient();

  try {
    await client.collection("users").authWithPassword(email, password);
  } catch (e) {
    return { error: "Incorrect email or password." };
  }

  const authCookie = client.authStore.exportToCookie();
  cookies().set("pb_auth", authCookie);
  redirect("/account");
}
