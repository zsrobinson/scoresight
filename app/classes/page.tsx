import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageLayout } from "~/components/page-layout";
import { Button } from "~/components/ui/button";
import { createServerClient } from "~/lib/pocketbase/server";
import { assignmentCount } from "~/lib/utils";

export default async function Page() {
  const client = createServerClient(cookies());
  if (!client.authStore.isValid) redirect("/login");
  const classes = await client.collection("classes").getFullList();
  const assignments = await client.collection("assignments").getFullList();

  return (
    <PageLayout>
      <div className="flex gap-4 justify-between w-full">
        <h2 className="font-semibold text-2xl">Classes</h2>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/classes/create">Create Class</Link>
          </Button>
          <Button asChild>
            <Link href="/classes/join">Join Class</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {classes.map((thisClass, i) => (
          <a
            className="flex flex-col border rounded-lg border-clip bg-clip-padding overflow-hidden"
            href={`/classes/${thisClass.id}`}
            key={i}
          >
            <div
              className="h-24 bg-border"
              style={{ maskImage: "url('/pie-factory.svg')" }}
            />

            <div className="flex flex-col p-4">
              <h3 className="font-medium">{thisClass.name}</h3>
              <p className="text-muted-foreground">
                {assignmentCount(
                  assignments.filter((assn) => assn.class === thisClass.id)
                    .length
                )}
              </p>
            </div>
          </a>
        ))}
      </div>
    </PageLayout>
  );
}
