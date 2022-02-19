import type { Browser } from 'puppeteer';
import type { PriceCheckResponse } from '../types/types';

export const getMenardsPrice = async (
  itemNumber: string,
  browser: Browser
): Promise<PriceCheckResponse> => {
  try {
    const page = await browser.newPage();
    await page.goto(
      `https://www.menards.com/main/search.html?search=${itemNumber}`
    );

    const stuff = await page.evaluate(() =>
      document.querySelector('#qubitEcProduct').getAttribute('value')
    );

    const itemJsonData = JSON.parse(stuff);
    const price = itemJsonData?.[0]?.product?.price?.value;
    await page.close();

    return { itemNumber, itemPrice: price, vendor: 'menards' };
  } catch (err) {
    console.log('Error in menards.ts: ', err.message);

    return {
      itemPrice: undefined,
      vendor: 'menards',
      itemNumber,
    };
  }
};
