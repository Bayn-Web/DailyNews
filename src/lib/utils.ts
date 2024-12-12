import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDay = () => {
  const date = new Date()
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
}

export const doFirstTimeFunc = (func: () => void, time = 2000) => {
  let isAllowed = true;
  let timeoutId: NodeJS.Timeout | undefined;
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (isAllowed) {
      func();
      isAllowed = false;
    }
    timeoutId = setTimeout(() => {
      isAllowed = true;
    }, time);
  };
};