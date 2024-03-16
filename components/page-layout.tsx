import { ReactNode } from "react";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto flex max-w-5xl flex-col items-start gap-4 p-8">
      {children}
    </main>
  );
}
