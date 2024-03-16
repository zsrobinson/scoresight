import type { Metadata } from "next";
import { ReactNode } from "react";
import { Navbar } from "~/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScoreSight",
  description: "The simple way to submit, manage, and grade assignments.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
