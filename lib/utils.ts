import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function assignmentCount(n: number) {
  return n === 1 ? `${n} Assignment` : `${n} Assignments`;
}
