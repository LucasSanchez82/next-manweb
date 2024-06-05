import { PrismaClient } from "@prisma/client";
import { test, expect, describe } from "bun:test";

describe("Database Connection", async () => {
  test("should connect to the database", async () => {
    const prisma = new PrismaClient();
    const result = await prisma.user.findFirst();

    expect(result).toBeDefined();
  });
});
