import type { Browser } from 'puppeteer';
import type { PriceCheckResponse } from '../types/types';

export const getHomeDepotPrice = async (
  itemNumber: string,
  browser: Browser
): Promise<PriceCheckResponse> => {
  try {
    const page = await browser.newPage();
    await page.goto(`https://www.homedepot.com/p/${itemNumber}`);
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
    return { itemNumber, itemPrice: price, vendor: 'home depot' };
  } catch (err) {
    console.log('Error in homedepot.ts: ', err.message);

    return {
      itemPrice: undefined,
      vendor: 'home depot',
      itemNumber,
    };
  }
};
