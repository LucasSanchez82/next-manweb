import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
export const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  
}); //instance global de prisma


export const getSafeSessionServer = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return session;
  } else redirect("/");
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
