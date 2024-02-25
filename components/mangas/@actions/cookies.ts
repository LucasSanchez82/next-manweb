"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export const setCookieSearchedTitle = (
  value: string | number,
  pathname?: string
) => {
  const cookieStore = cookies();
  cookieStore.set("searchedTitle", String(value), { expires: Date.now() });
  cookieStore.set("page", "1");
  if (pathname) {
    revalidatePath(pathname, 'page');
  }
};

export const getPage = () => {
  const cookieStore = cookies();
  const page = Number(cookieStore.get("page")?.value || 1);
  return page;
};

export const incrCookiePage = () => {
  const cookieStore = cookies();
  const currPage = getPage();
  cookieStore.set("page", String(currPage + 1));
};

export const decrCookiePage = () => {
  const cookieStore = cookies();
  const currPage = getPage();
  if (currPage > 0) {
    cookieStore.set("page", String(currPage - 1));
  }
};

export const resetCookiePage = () => {
  const cookieStore = cookies();
  cookieStore.set("page", "1");
}
