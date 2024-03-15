"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "~/lib/pocketbase/server";

export async function register(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const passwordConfirm = formData.get("passwordConfirm");
  const name = formData.get("name");

  if (!email || typeof email !== "string") {
    throw new Error("cannot read email");
  } else if (!password || typeof password !== "string") {
    throw new Error("cannot read password");
  } else if (!passwordConfirm || typeof passwordConfirm !== "string") {
    throw new Error("cannot read passwordConfirm");
  } else if (!name || typeof name !== "string") {
    throw new Error("cannot read name");
  }

  const client = createServerClient();
  await client.collection("users").create({
    email,
    password,
    passwordConfirm,
    name,
  });

  const user = await client
    .collection("users")
    .authWithPassword(email, password);

  const authCookie = client.authStore.exportToCookie();
  cookies().set("pb_auth", authCookie);

  redirect("/account");
}
