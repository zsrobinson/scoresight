import { IconArrowLeft } from "@tabler/icons-react";
import { format } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { PageLayout } from "~/components/page-layout";
import { Badge } from "~/components/ui/badge";
import { createServerClient } from "~/lib/pocketbase/server";
import { ClassesResponse } from "~/lib/pocketbase/types";

type LayoutProps = { children: ReactNode; params: { id: string } };

export default async function Layout({ children, params }: LayoutProps) {
  const client = createServerClient(cookies());
  if (!client.authStore.isValid) redirect("/login");

  const assignment = await client.collection("assignments").getOne(params.id, {
    expand: "class",
  });

  // prettier-ignore
  const thisClass = (assignment.expand as {
    class: ClassesResponse<unknown>;
  })["class"];

  return (
    <PageLayout>
      <a
        href={`/classes/${assignment.class}`}
        className="flex gap-1 items-center text-muted-foreground hover:text-foreground transition-colors group"
      >
        <IconArrowLeft
          size={16}
          className="translate-x-0.5 group-hover:-translate-x-0 transition-transform"
        />
        {thisClass.name}
      </a>

      <div className="flex flex-col items-start gap-1">
        <h2 className="font-semibold text-2xl">{assignment.name}</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>{thisClass.name}</Badge>
          <Badge variant="outline">Due {format(assignment.due, "PPPp")}</Badge>
        </div>
      </div>

      {children}
    </PageLayout>
  );
}
