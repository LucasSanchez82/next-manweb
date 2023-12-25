import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const GET = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: ".tmpPuppeteer",
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.scan-manga.com/api/search/quick.json?term=constellationn"
  );
  await page.content();
  const json = await page.evaluate(() =>
    JSON.parse(document.querySelector("body")!.innerText)
  );
  await browser.close();
  return NextResponse.json(json);
};