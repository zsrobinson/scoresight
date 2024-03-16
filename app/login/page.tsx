import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PageLayout } from "~/components/page-layout";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { login } from "~/lib/auth/login";
import { createServerClient } from "~/lib/pocketbase/server";

export default function Page() {
  const client = createServerClient(cookies());
  if (client.authStore.isValid) {
    redirect("/account");
  }

  return (
    <PageLayout>
      <form action={login}>
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
          className="max-w-xs mb-4"
          required
        />

        <Button type="submit">Submit</Button>
      </form>
    </PageLayout>
  );
}
