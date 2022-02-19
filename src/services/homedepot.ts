import type { Browser } from 'puppeteer';

export const getHomeDepotPrice = async (
  partNumber: string,
  browser: Browser
): Promise<number | undefined> => {
  const page = await browser.newPage();
  await page.goto(`https://www.homedepot.com/p/${partNumber}`);
  //   await page.waitForTimeout(5000);
  //   const stuff = await page.$('#thd-helmet__script--productStructureData');
  const stuff = await page.evaluate(
    () =>
      document.querySelector('#thd-helmet__script--productStructureData')
        .innerHTML
  );

  const itemJsonData = JSON.parse(stuff);
  const price = itemJsonData?.offers?.price;
  await page.close();
  return price;
};
