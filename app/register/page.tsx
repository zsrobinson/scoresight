import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PageLayout } from "~/components/page-layout";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { register } from "~/lib/auth/register";
import { createServerClient } from "~/lib/pocketbase/server";

export default function Page() {
  const client = createServerClient(cookies());
  if (client.authStore.isValid) {
    redirect("/account");
  }

  return (
    <PageLayout>
      <form action={register}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          className="max-w-xs mb-2"
          required
        />

        <Input
          type="email"
          name="email"
          placeholder="Email"
          className="max-w-xs mb-2"
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          className="max-w-xs mb-2"
          required
        />

        <Input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          className="max-w-xs mb-4"
          required
        />

        <Button type="submit">Submit</Button>
      </form>
    </PageLayout>
  );
}
