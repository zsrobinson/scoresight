"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavLinkProps = { href: string; children: ReactNode };

export function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname();
  const currPath =
    href === path || (href.includes("classes") && path.includes("classes"));

  return (
    <Link
      href={href}
      className={
        "transition-colors " +
        (currPath
          ? "text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground")
      }
    >
      {children}
    </Link>
  );
}
