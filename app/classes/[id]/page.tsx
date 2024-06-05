import { IconArrowLeft } from "@tabler/icons-react";
import { format } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PageLayout } from "~/components/page-layout";
import { Badge } from "~/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { createServerClient } from "~/lib/pocketbase/server";
import { assignmentCount } from "~/lib/utils";

type PageProps = { params: { id: string } };

export default async function Page({ params }: PageProps) {
  const client = createServerClient(cookies());
  if (!client.authStore.isValid) redirect("/login");
  const thisClass = await client.collection("classes").getOne(params.id);
  const isOwner = thisClass.owner === client.authStore.model!.id;
  const assignments = await client.collection("assignments").getFullList({
    filter: `class.id = "${thisClass.id}"`,
  });

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

      <div className="flex flex-col items-start gap-1">
        <h2 className="font-semibold text-2xl">{thisClass.name}</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>{isOwner ? "Instructor" : "Student"}</Badge>
          <Badge variant="outline">{assignmentCount(assignments.length)}</Badge>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignments.map((assignment) => (
            <TableRow key={assignment.id}>
              <TableCell>{assignment.id}</TableCell>
              <TableCell>{assignment.name}</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>{format(assignment.due, "PPPp")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {assignments.length === 0 && (
          <TableCaption>No assignments to display</TableCaption>
        )}
      </Table>
    </PageLayout>
  );
}
