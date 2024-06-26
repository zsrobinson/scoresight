import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PageLayout } from "~/components/page-layout";
import { createServerClient } from "~/lib/pocketbase/server";

export default function Page() {
  const client = createServerClient(cookies());
  const user = client.authStore;

  if (!user.isValid) {
    redirect("/login");
  }

  return (
    <PageLayout>
      <pre>
        <code>{JSON.stringify(user.model, null, 2)}</code>
      </pre>
    </PageLayout>
  );
}
