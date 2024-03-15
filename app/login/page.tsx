import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login } from "~/lib/auth/login";
import { createServerClient } from "~/lib/pocketbase/server";

export default function Page() {
  const client = createServerClient(cookies());
  if (client.authStore.isValid) {
    redirect("/account");
  }

  return (
    <main>
      <form className="flex flex-col gap-2 items-start" action={login}>
        <input
          type="text"
          name="email"
          placeholder="email"
          className="border"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="password"
          className="border"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
