"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { ReactNode } from "react";
import { IconLoader2 } from "@tabler/icons-react";

export function SubmitButton({ children }: { children?: ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading</span>
        </>
      ) : (
        children ?? "Submit"
      )}
    </Button>
  );
}
