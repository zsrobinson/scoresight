"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "~/lib/pocketbase/server";

export async function create(_: any, formData: FormData) {
  const name = formData.get("name");
  let newClassId = "";

  if (!name || typeof name !== "string") {
    return { error: "Cannot read name." };
  }

  try {
    const client = createServerClient(cookies());
    const owner = await client
      .collection("users")
      .getOne(client.authStore.model?.id);
    const newClass = await client
      .collection("classes")
      .create({ name, owner: owner.id });
    newClassId = newClass.id;
  } catch (e) {
    console.error((e as Error).message);
    return { error: "Cannot create class." };
  }

  // `redirect()` cannot be put inside of a try-catch block
  // see https://github.com/vercel/next.js/issues/49298#issuecomment-1537433377
  return redirect("/classes/" + newClassId);
}

export async function join(_: any, formData: FormData) {
  const id = formData.get("id");

  if (!id || typeof id !== "string") {
    return { error: "Cannot read id." };
  }

  try {
    const client = createServerClient(cookies());
    const student = await client
      .collection("users")
      .getOne(client.authStore.model?.id);
    await client.collection("classes").update(id, { "students+": student.id });
  } catch (e) {
    return { error: "Cannot create class." };
  }

  return redirect("/classes/" + id);
}
