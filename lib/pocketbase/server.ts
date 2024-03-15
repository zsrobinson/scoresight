import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import PocketBase from "pocketbase";
import { TypedPocketBase } from "./types";

export function createServerClient(cookieStore?: ReadonlyRequestCookies) {
  if (!process.env.NEXT_PUBLIC_POCKETBASE_URL) {
    throw new Error("POCKETBASE_URL undefined");
  } else if (typeof window !== "undefined") {
    throw new Error("The server client is only accessible on the server.");
  }

  const client = new PocketBase(
    process.env.NEXT_PUBLIC_POCKETBASE_URL
  ) as TypedPocketBase;

  if (cookieStore) {
    const authCookie = cookieStore.get("pb_auth");
    if (authCookie) {
      client.authStore.loadFromCookie(authCookie.value);
    }
  }

  return client;
}
