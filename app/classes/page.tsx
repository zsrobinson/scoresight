import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PageLayout } from "~/components/page-layout";
import { createServerClient } from "~/lib/pocketbase/server";

export default async function Page() {
  const client = createServerClient(cookies());
  if (!client.authStore.isValid) redirect("/login");
  const classes = await client.collection("classes").getFullList();

  return (
    <PageLayout>
      <pre>
        <code>{JSON.stringify(classes, null, 2)}</code>
      </pre>
    </PageLayout>
  );
}
