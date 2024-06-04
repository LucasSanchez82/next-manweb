import { Manga, PrismaClient, User } from "@prisma/client";
import {
  expect,
  describe,
  it,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} from "bun:test";
describe("Ajouter simple manga", () => {
  let prisma: PrismaClient = new PrismaClient({
    log: [],
  });
  let testAccount: User;
  beforeAll(async () => {
    testAccount = await prisma.user.upsert({
      where: { email: "test@test.com" },
      update: {},
      create: {
        email: "test@test.com",
        emailVerified: new Date(),
      },
    });
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: testAccount.id } });
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    prisma = new PrismaClient({ log: [] });
    await prisma.manga.deleteMany({ where: { userId: testAccount.id } });
  });
  afterEach(async () => {
    await prisma.$disconnect();
  });

  it("Ajouter un manga", async () => {
    const mangaCreated = await prisma.manga.create({
      data: {
        chapter: 0,
        linkImage: "https://mangakakalot.shueisha.co.jp/titles/100106",
        linkManga: "https://mangakakalot.shueisha.co.jp/titles/100106",
        title: "Test",
        user: { connect: { id: testAccount.id } },
      },
    });
    const mangaFinded = await prisma.manga.findUnique({
      where: { id: mangaCreated.id },
    });
    expect(mangaFinded).toBeTruthy();
    expect(mangaFinded?.title).toBe("Test");
  });

  it("modifier le manga", async () => {
    const mangaCreated = await prisma.manga.create({
      data: {
        chapter: 0,
        linkImage: "https://mangakakalot.shueisha.co.jp/titles/100106",
        linkManga: "https://mangakakalot.shueisha.co.jp/titles/100106",
        title: "Test",
        user: { connect: { id: testAccount.id } },
      },
    });
    const mangaUpdated = await prisma.manga.update({
      where: { id: mangaCreated.id },
      data: { title: "Test2" },
    });
    expect(mangaUpdated).toBeTruthy();
    expect(mangaUpdated?.title).toBe("Test2");
  });

  it("ajouter manga avec categories", async () => {
    const mangaCreated = await prisma.manga.create({
      data: {
        chapter: 0,
        linkImage: "https://mangakakalot.shueisha.co.jp/titles/100106",
        linkManga: "https://mangakakalot.shueisha.co.jp/titles/100106",
        title: "Test",
        MangaCategorie: {
          create: {
            Categorie: {
              connectOrCreate: {
                where: { libelle: "Test" },
                create: { libelle: "Test" },
              },
            },
          },
        },
        user: { connect: { id: testAccount.id } },
      },
    });
    const categoriesOfManga = await prisma.manga.findUnique({
      where: { id: mangaCreated.id },
      include: { MangaCategorie: { include: { Categorie: true } } },
    });
    console.log(categoriesOfManga?.MangaCategorie[0].Categorie);

    expect(categoriesOfManga).toBeTruthy();
    expect(categoriesOfManga?.MangaCategorie).toBeTruthy();
    expect(categoriesOfManga?.MangaCategorie[0].Categorie).toBeTruthy();
    expect(categoriesOfManga?.MangaCategorie[0].Categorie.libelle).toBe("Test");
  });

  it("modifier manga avec categories", async () => {
    const mangaCreated = await prisma.manga.create({
      data: {
        chapter: 0,
        linkImage: "https://mangakakalot.shueisha.co.jp/titles/100106",
        linkManga: "https://mangakakalot.shueisha.co.jp/titles/100106",
        title: "Test",
        MangaCategorie: {
          create: {
            Categorie: {
              connectOrCreate: {
                where: { libelle: "Test" },
                create: { libelle: "Test" },
              },
            },
          },
        },
        user: { connect: { id: testAccount.id } },
      },
    });
    const mangaUpdated = await prisma.manga.update({
      where: { id: mangaCreated.id },
      data: {
        title: "Test",
        MangaCategorie: {
          create: {
            Categorie: {
              connectOrCreate: {
                where: { libelle: "Test2" },
                create: { libelle: "Test2" },
              },
            },
          },
        },
      },
    });
    const deletedRelation = await prisma.mangaCategorie.deleteMany({
      where: {
        Categorie: {
          libelle: "Test",
        },
        Manga: {
          id: mangaCreated.id,
        },
      },
    })
    
    const categoriesOfManga = await prisma.manga.findUnique({
      where: { id: mangaCreated.id },
      include: { MangaCategorie: { include: { Categorie: true } } },
    });
    expect(categoriesOfManga).toBeTruthy();
    expect(categoriesOfManga?.MangaCategorie).toBeTruthy();
    expect(categoriesOfManga?.MangaCategorie[0].Categorie).toBeTruthy();
    expect(categoriesOfManga?.MangaCategorie[0].Categorie.libelle).toBe("Test2");
    expect(categoriesOfManga?.MangaCategorie.length).toBe(1);
  });
});
