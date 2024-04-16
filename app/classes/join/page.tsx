"use client";

import { useFormState } from "react-dom";
import { PageLayout } from "~/components/page-layout";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { join } from "~/lib/classes";

export default function Page() {
  const [state, action] = useFormState(join, { error: "" });

  return (
    <PageLayout>
      <h2 className="font-semibold text-2xl">Create Class</h2>
      <form action={action} className="flex flex-col gap-4 items-start">
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            name="id"
            placeholder="Class ID"
            className="max-w-xs"
            required
          />
        </div>

        <div className="flex gap-4 items-center">
          <Button type="submit">Submit</Button>
          {state.error !== "" && <p className="text-red-500">{state.error}</p>}
        </div>
      </form>
    </PageLayout>
  );
}
