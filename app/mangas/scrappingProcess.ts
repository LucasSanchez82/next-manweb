// "use server"

// import puppeteer from "puppeteer";

// export const getMangaBySrapTitle = async (title: string) => {
//   const browser = await puppeteer.launch({
//     headless: false,
//     userDataDir: ".tmpPuppeteer",
//   });
//   const page = await browser.newPage();
//   await page.goto(
//     "https://www.scan-manga.com/api/search/quick.json?term=" +
//       encodeURIComponent(String(title))
//   );
//   await page.content();
//   const json = await page.evaluate(() =>
//     JSON.parse(document.querySelector("body")!.innerText)
//   );
//   console.log("🚀 ~ file: page.tsx:15 ~ scrappingProcess ~ json:", json);

//   await browser.close();
// };
