import type { Browser } from 'puppeteer';
import type { PriceCheckResponse } from '../types/types';

export const getSummitRacingPrice = async (
  partNumber: string,
  browser: Browser
): Promise<PriceCheckResponse> => {
  try {
    const page = await browser.newPage();
    let itemPrice: number;

    page.on('response', async (response) => {
      if (response.url().includes('data/pricing/parts')) {
        const responseData = await response.json();
        itemPrice = responseData.Results[partNumber.toUpperCase()].CurrentPrice; // TODO: refactor into a deep search for "price" key
      }
    });

    // Navigate and wait for response before moving on to ensure parts api response is captured
    await Promise.all([
      page.goto(`https://www.summitracing.com/parts/${partNumber}`),
      page.waitForResponse(
        (response) =>
          response.url() ===
            'https://www.summitracing.com/data/pricing/parts' &&
          response.status() === 200,
        { timeout: 2000 } // Adjust if running on slower connections that may take longer to return api response
      ),
    ]);

    await page.close();

    return { itemPrice, vendor: 'summit racing', itemNumber: partNumber };
  } catch (err) {
    console.log('Error in summitRacing.ts: ', err.message);

    return {
      itemPrice: undefined,
      vendor: 'summit racing',
      itemNumber: partNumber,
    };
  }
};
