"use client";

import { useFormState } from "react-dom";
import { PageLayout } from "~/components/page-layout";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { login } from "~/lib/auth/login";

export default function Page() {
  const [state, action] = useFormState(login, { error: "" });

  return (
    <PageLayout>
      <form action={action} className="flex flex-col gap-4 items-start">
        <div className="flex flex-col gap-2">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="max-w-xs"
            required
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
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
