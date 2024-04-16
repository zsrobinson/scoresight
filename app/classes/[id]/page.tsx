import { IconArrowLeft } from "@tabler/icons-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PageLayout } from "~/components/page-layout";
import { createServerClient } from "~/lib/pocketbase/server";

type PageProps = { params: { id: string } };

export default async function Page({ params }: PageProps) {
  const client = createServerClient(cookies());
  if (!client.authStore.isValid) redirect("/login");
  const thisClass = await client.collection("classes").getOne(params.id);

  return (
    <PageLayout>
      <a
        href="/classes"
        className="flex gap-1 items-center text-muted-foreground hover:text-foreground transition-colors group"
      >
        <IconArrowLeft
          size={16}
          className="translate-x-0.5 group-hover:-translate-x-0 transition-transform"
        />
        All Classes
      </a>
      <h2 className="font-semibold text-2xl">{thisClass.name}</h2>
      <pre>
        <code>{JSON.stringify(thisClass, null, 2)}</code>
      </pre>
    </PageLayout>
  );
}
