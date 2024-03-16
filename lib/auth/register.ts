"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "~/lib/pocketbase/server";

export async function register(_: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConfirm = formData.get("passwordConfirm");
  const name = formData.get("name");

  if (!email || typeof email !== "string") {
    return { error: "Cannot read email." };
  } else if (!password || typeof password !== "string") {
    return { error: "Cannot read password." };
  } else if (!passwordConfirm || typeof passwordConfirm !== "string") {
    return { error: "Cannot read passwordConfirm." };
  } else if (!name || typeof name !== "string") {
    return { error: "Cannot read name." };
  }

  const client = createServerClient();

  try {
    const user = { email, password, passwordConfirm, name };
    await client.collection("users").create(user);
    await client.collection("users").authWithPassword(email, password);
  } catch (e) {
    return { error: "Unable to register your account." };
  }

  const authCookie = client.authStore.exportToCookie();
  cookies().set("pb_auth", authCookie);
  redirect("/account");
}
