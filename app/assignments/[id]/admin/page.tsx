import { IconExternalLink } from "@tabler/icons-react";
import { format } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
  const assignment = await client.collection("assignments").getOne(params.id);

  const thisClass = (await client
    .collection("classes")
    .getOne(assignment.class, {
      expand: "owner,students",
    })) as ClassesResponse<unknown> & {
    expand: {
      owner: UsersResponse<unknown>;
      students: UsersResponse<unknown>[];
    };
  };

  /* send unauthorized users to the normal page */
  if (thisClass.owner !== client.authStore.model!.id) {
    redirect(`/assignments/${assignment.id}`);
  }

  const submissions = (await client.collection("submissions").getFullList({
    filter: `assignment.id = "${assignment.id}"`,
    sort: "user,created",
    expand: "user",
  })) as (SubmissionsResponse<unknown> & {
    expand: { user: UsersResponse<unknown> };
  })[];

  const studentCountMap = new Map<string, number>();
  const studentSubmissionMap = new Map<string, SubmissionsResponse<unknown>>();

  for (let student of thisClass.expand.students) {
    studentCountMap.set(student.id, 0);
  }

  for (let submission of submissions) {
    let prev = studentCountMap.get(submission.expand.user.id);
    studentCountMap.set(submission.expand.user.id, (prev ?? 0) + 1);
    studentSubmissionMap.set(submission.expand.user.id, submission);
  }

  return (
    <>
      <p>
        {studentSubmissionMap.size} of {thisClass.expand.students.length}{" "}
        students have turned this assignment in.
      </p>
      <Table className="w-full flex-grow">
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Total Submissions</TableHead>
            <TableHead>Latest Submission</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Preview</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {thisClass.expand.students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{studentCountMap.get(student.id) ?? "N/A"}</TableCell>
              <TableCell>
                {studentSubmissionMap.get(student.id)
                  ? format(
                      studentSubmissionMap.get(student.id)!.created,
                      "PPPp"
                    )
                  : "N/A"}
              </TableCell>
              <TableCell>N/A</TableCell>
              <TableCell>
                {studentSubmissionMap.get(student.id) ? (
                  <a
                    href={client.files.getUrl(
                      studentSubmissionMap.get(student.id)!,
                      studentSubmissionMap.get(student.id)!.file
                    )}
                    className="group"
                  >
                    <span className="underline decoration-border">
                      View Latest Submission
                    </span>
                    <IconExternalLink
                      className="inline pb-0.5 pl-1 text-muted-foreground"
                      size={20}
                    />
                  </a>
                ) : (
                  "N/A"
                )}
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
