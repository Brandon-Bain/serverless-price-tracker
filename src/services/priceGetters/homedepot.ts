import type { Browser } from 'puppeteer';
import type { PriceCheckResponse } from '../../types/types';

export const getHomeDepotPrice = async (itemNumber: string, browser: Browser): Promise<PriceCheckResponse> => {
  try {
    const page = await browser.newPage();
    await page.goto(`https://www.homedepot.com/p/${itemNumber}`);

    const priceJsonString = await page.evaluate((priceSelector) => {
      if (!document) {
        throw new Error('Document was undefined');
      }

      const element = document.querySelector(priceSelector);

      if (!element) {
        throw new Error(`Element was not found matching selector [${priceSelector}]`);
      }

      return element.innerHTML;
    }, '#thd-helmet__script--productStructureData');

    const itemJsonData = JSON.parse(priceJsonString);
    const price = itemJsonData?.offers?.price;
    await page.close();

    return { itemNumber, itemPrice: price, vendor: 'homedepot' };
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error in homedepot.ts: ', err.message);
    }

    return {
      itemPrice: undefined,
      vendor: 'home depot',
      itemNumber,
    };
  }
};
