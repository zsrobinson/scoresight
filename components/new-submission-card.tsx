"use client";

import { createBrowserClient } from "~/lib/pocketbase/browser";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { useRef } from "react";
import { AssignmentsResponse, ClassesResponse } from "~/lib/pocketbase/types";
import { useFormState, useFormStatus } from "react-dom";
import { newSubmission } from "~/lib/actions/new-submission";
import { SubmitButton } from "./submit-button";

export function NewSubmissionCard({
  thisClass,
  assignment,
}: {
  thisClass: ClassesResponse<unknown>;
  assignment: AssignmentsResponse<unknown>;
}) {
  const [state, action] = useFormState(newSubmission, { error: "" });
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Submission</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <form className="flex flex-row gap-4 items-center" action={action}>
          <Input
            type="file"
            name="file"
            accept="application/pdf"
            required
            ref={inputRef}
          />
          <input type="hidden" name="assignment" value={assignment.id} />
          <SubmitButton />
        </form>
        {state?.error && (
          <p className="text-destructive text-sm">{state.error}</p>
        )}
      </CardContent>
    </Card>
  );
}
