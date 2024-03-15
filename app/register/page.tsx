import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { register } from "~/lib/auth/register";
import { createServerClient } from "~/lib/pocketbase/server";

export default function Page() {
  const client = createServerClient(cookies());
  if (client.authStore.isValid) {
    redirect("/account");
  }

  return (
    <main>
      <form className="flex flex-col gap-2 items-start" action={register}>
        <input
          type="text"
          name="name"
          placeholder="name"
          className="border"
          required
        />

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

        <input
          type="password"
          name="passwordConfirm"
          placeholder="passwordConfirm"
          className="border"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
