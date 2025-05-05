import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const parts = dateString.split("/");
  let date: Date;

  if (parts.length === 3) {
    let [day, month, year] = parts.map((p) => parseInt(p, 10));

    // If someone passed "24", interpret as 2024, not 1924:
    if (year >= 0 && year < 100) {
      year += 2000;
    }

    // monthIndex is zero-based
    date = new Date(year, month - 1, day);
  } else {
    date = new Date(dateString);
  }

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}


