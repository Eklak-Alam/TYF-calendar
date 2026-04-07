// src/lib/utils.js

// clsx helps us easily join CSS classes together
import { clsx } from "clsx";
// tailwind-merge prevents conflicts (e.g., if you accidentally have both bg-red and bg-blue)
import { twMerge } from "tailwind-merge";

// The 'cn' function allows us to cleanly merge Tailwind classes in our components
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}