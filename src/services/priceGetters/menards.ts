import type { Browser } from 'puppeteer';
import type { PriceCheckResponse } from '../../types/types';

export const getMenardsPrice = async (itemNumber: string, browser: Browser): Promise<PriceCheckResponse> => {
  try {
    const page = await browser.newPage();
    await page.goto(`https://www.menards.com/main/search.html?search=${itemNumber}`);

    const priceJsonString = await page.evaluate((priceSelector) => {
      if (!document) {
        throw new Error('Document was undefined');
      }

      const element = document.querySelector(priceSelector);

      if (!element) {
        throw new Error(`Element was not found matching selector [${priceSelector}]`);
      }

      return element.getAttribute('value');
    }, '#qubitEcProduct');

    if (priceJsonString === null) {
      throw new Error('JSON string was null');
    }

    const itemJsonData = JSON.parse(priceJsonString);
    const price = itemJsonData?.[0]?.product?.price?.value;
    await page.close();

    return { itemNumber, itemPrice: price, vendor: 'menards' };
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error in menards.ts: ', err.message);
    }

    return {
      itemPrice: undefined,
      vendor: 'menards',
      itemNumber,
    };
  }
};
