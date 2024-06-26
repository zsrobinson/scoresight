import { IconExternalLink } from "@tabler/icons-react";
import { format } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NewSubmissionCard } from "~/components/new-submission-card";
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
import {
  ClassesResponse,
  SubmissionsResponse,
  UsersResponse,
} from "~/lib/pocketbase/types";

type PageProps = { params: { id: string } };

export default async function Page({ params }: PageProps) {
  const client = createServerClient(cookies());
  if (!client.authStore.isValid) redirect("/login");
  const assignment = await client.collection("assignments").getOne(params.id, {
    expand: "class",
  });

  const submissions = (await client.collection("submissions").getFullList({
    filter: `assignment.id = "${assignment.id}"`,
    sort: "user,created",
    expand: "user",
  })) as (SubmissionsResponse<unknown> & {
    expand: { user: UsersResponse<unknown> };
  })[];

  // prettier-ignore
  const thisClass = (assignment.expand as {
    class: ClassesResponse<unknown>;
  })["class"];

  if (thisClass.owner === client.authStore.model!.id) {
    redirect(`/assignments/${assignment.id}/admin`);
  }

  return (
    <>
      <NewSubmissionCard thisClass={thisClass} assignment={assignment} />

      <Table className="w-full flex-grow">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Preview</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission, i) => (
            <TableRow key={submission.id}>
              <TableCell>Submission {i + 1}</TableCell>
              <TableCell>{format(submission.created, "PPPp")}</TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>
                <a
                  href={client.files.getUrl(submission, submission.file)}
                  className="group"
                >
                  <span className="underline decoration-border">
                    View Submission
                  </span>
                  <IconExternalLink
                    className="inline pb-0.5 pl-1 text-muted-foreground"
                    size={20}
                  />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {submissions.length === 0 && (
          <TableCaption>No submissions to display</TableCaption>
        )}
      </Table>
    </>
  );
}
