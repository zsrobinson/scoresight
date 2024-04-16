"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "~/lib/pocketbase/server";
import { ClassesResponse } from "./pocketbase/types";

export async function create(_: any, formData: FormData) {
  const name = formData.get("name");

  if (!name || typeof name !== "string") {
    return { error: "Cannot read name." };
  }

  try {
    const client = createServerClient(cookies());
    const owner = await client
      .collection("users")
      .getOne(client.authStore.model?.id);
    const thisClass = await client
      .collection("classes")
      .create({ name, owner: owner.id });
    return redirect("/classes/" + thisClass.id);
  } catch (e) {
    return { error: "Cannot create class." };
  }
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

  redirect("/classes/" + id);
}
