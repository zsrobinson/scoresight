import { IconArrowLeft } from "@tabler/icons-react";
import { format } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PageLayout } from "~/components/page-layout";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
import { TypedPocketBase, UsersResponse } from "~/lib/pocketbase/types";
import { assignmentCount } from "~/lib/utils";

type PageProps = { params: { id: string } };

export default async function Page({ params }: PageProps) {
  const client = createServerClient(cookies());
  if (!client.authStore.isValid) redirect("/login");
  const thisClass = await client.collection("classes").getOne(params.id, {
    expand: "owner,students",
  });
  const isOwner = thisClass.owner === client.authStore.model!.id;
  const assignments = await client.collection("assignments").getFullList({
    filter: `class.id = "${thisClass.id}"`,
  });

  const { owner, students } = thisClass.expand as {
    owner: UsersResponse<unknown>;
    students: UsersResponse<unknown>[];
  };

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

      <div className="flex flex-col gap-4 md:gap-8 w-full md:flex-row">
        <Table className="w-full flex-grow">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Due</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submissions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.name}</TableCell>
                <TableCell>{format(assignment.due, "PPPp")}</TableCell>
                <TableCell>N/A</TableCell>
                <TableCell>0</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {assignments.length === 0 && (
            <TableCaption>No assignments to display</TableCaption>
          )}
        </Table>

        <div className="flex flex-col gap-2 p-4 border rounded-lg min-w-60">
          <h3 className="font-semibold text-lg leading-none pb-2">People</h3>
          <UserDisplay client={client} user={owner} text="Instructor" />
          {students?.map((student) => (
            <UserDisplay
              key={student.id}
              client={client}
              user={student}
              text="Student"
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

function UserDisplay({
  client,
  user,
  text,
}: {
  client: TypedPocketBase;
  user: UsersResponse<unknown>;
  text: string;
}) {
  return (
    <div className="flex gap-2 items-center">
      <Avatar>
        <AvatarImage
          src={client.files.getUrl(user, user.avatar)}
          alt={user.name}
        />
        <AvatarFallback>
          {user.name.split(" ").map((word) => word[0])}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm leading-none font-medium">{user.name}</p>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  );
}
