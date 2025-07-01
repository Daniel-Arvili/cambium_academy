import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const parts = dateString.split("/");
  let date: Date;

  if (parts.length === 3) {
    const day   = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    let   year  = parseInt(parts[2], 10);

    if (year >= 0 && year < 100) {
      year += 2000;
    }

    date = new Date(year, month - 1, day);
  } else {
    date = new Date(dateString);
  }

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-US", {
    year:  "numeric",
    month: "short",
    day:   "numeric",
  }).format(date);
}

// Unicode-safe slugify: keeps Hebrew/Unicode, replaces spaces/symbols with dashes, trims, lowercases
export function slugify(str: string) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[\s%\u2000-\u206F\u2E00-\u2E7F\'"!@#$^&*()_+={}|:;,.<>?`~\[\]\\/]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
