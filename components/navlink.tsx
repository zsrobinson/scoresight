"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavLinkProps = { href: string; children: ReactNode };

export function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={
        href === path
          ? "underline decoration-muted-foreground/30 underline-offset-4"
          : ""
      }
    >
      {children}
    </Link>
  );
}
