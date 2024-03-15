// "use client";

// import PocketBase from "pocketbase";
// import { TypedPocketBase } from "./types";

// let singletonClient: TypedPocketBase | null = null;

// export function createBrowserClient() {
//   if (!process.env.NEXT_PUBLIC_POCKETBASE_URL) {
//     throw new Error("POCKETBASE_URL undefined");
//   }

//   const createNewClient = () => {
//     return new PocketBase(
//       process.env.NEXT_PUBLIC_POCKETBASE_URL
//     ) as TypedPocketBase;
//   };

//   const client = singletonClient ?? createNewClient();
//   if (typeof window === "undefined") return client;
//   if (!singletonClient) singletonClient = client;

//   singletonClient.authStore.onChange(() => {
//     document.cookie = singletonClient!.authStore.exportToCookie({
//       httpOnly: false,
//     });
//   });

//   return singletonClient;
// }
