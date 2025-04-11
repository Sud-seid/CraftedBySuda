import { clsx, type ClassValue } from "clsx"

// Simplified version without tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}