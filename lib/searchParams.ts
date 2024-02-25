"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const addSearchParams = ({
  pathname,
  values,
  searchParams,
  router,
}: {
  values: { key: string; value: string }[];
  pathname: string;
  searchParams: URLSearchParams;
  router: AppRouterInstance;
}) => {
  const params = new URLSearchParams(searchParams.toString());
  for(const {key, value} of values) {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  }
  router.push(pathname + "?" + params.toString());
  return params.toString();
};
