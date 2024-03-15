import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "~/lib/pocketbase/server";

export default function Page() {
  const client = createServerClient(cookies());
  const user = client.authStore;

  if (!user.isValid) {
    redirect("/login");
  }

  return (
    <main>
      <pre>
        <code>{JSON.stringify(user.model, null, 2)}</code>
      </pre>
    </main>
  );
}
