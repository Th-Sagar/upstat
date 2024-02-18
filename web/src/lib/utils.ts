import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { paths } from "./api/v1";
import createClient from "openapi-fetch";
import { useNavigate } from "react-router";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAsDateHour = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    hour: "numeric",
    minute: "numeric",
  });

export const formatAsDayDateHour = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  });

export const formatAsMonthDate = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
  });

export const formatAsMonthYear = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    month: "short",
    year: "numeric",
  });

export const isValidToken = (token: string) => {
  if (!token) {
    return false;
  }

  const payload = token.split(".")[1];
  if (!payload) {
    return false;
  }

  const decodedPayload = JSON.parse(window.atob(payload));

  const expiryTime = decodedPayload.exp * 1000;
  const currentTime = Date.now();
  return expiryTime > currentTime;
};

export const client = createClient<paths>({
  baseUrl: "/",
});

export const refreshAccessToken = async () => {
  const response = await fetch("/api/auth/refresh-token", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "applications/json",
    },
  });
  if (!response.ok) {
    const navigate = useNavigate();
    navigate("/");
  }
};
