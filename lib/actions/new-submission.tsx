"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "~/lib/pocketbase/server";

/**
 * Creates a new record in the submissions collection.
 * `formData` is expected to contain a `file` and an `assignment` id
 */
export async function newSubmission(_: any, formData: FormData) {
  const client = createServerClient(cookies());
  const file = formData.get("file");
  const assignment = formData.get("assignment");

  if (!file || !(file instanceof File)) {
    return { error: "Cannot read file." };
  } else if (!assignment || typeof assignment !== "string") {
    return { error: "Cannot read assignment id." };
  } else if (!client.authStore.isValid) {
    return { error: "Unauthenticated." };
  }

  try {
    formData.append("user", client.authStore.model?.id);
    await client.collection("submissions").create(formData);
    revalidatePath("/assignments");
    return;
  } catch (e) {
    if (JSON.stringify(e).includes("maximum allowed file size")) {
      // actual max file size is 50 mebibytes or 52428800 bytes
      return { error: "Unable to upload file, max file size is 50MB." };
    } else {
      return { error: "Unable to create record." };
    }
  }
}
