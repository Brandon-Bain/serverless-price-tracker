import type { Browser } from 'puppeteer';
import type { PriceCheckResponse } from '../types/types';

export const getAmazonPrice = async (
  itemNumber: string,
  browser: Browser
): Promise<PriceCheckResponse> => {
  try {
    const page = await browser.newPage();
    await page.goto(`https://www.amazon.com/dp/${itemNumber}`);

    const itemData = await page.evaluate(
      () =>
        document.querySelector(
          '#corePrice_feature_div > div > span > span.a-offscreen'
        ).innerHTML
    );

    const formattedItemData = itemData.replace(/\$/g, '');
    const price = parseFloat(formattedItemData);
    await page.close();

    return { itemNumber, itemPrice: price, vendor: 'amazon' };
  } catch (err) {
    console.log('Error in amazon.ts: ', err.message);

    return {
      itemPrice: undefined,
      vendor: 'amazon',
      itemNumber,
    };
  }
};
