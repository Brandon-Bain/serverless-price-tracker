import { getInnerHtml } from '../../utils/pageUtils';
import type { Browser, Page } from 'puppeteer';
import type { PriceCheckResponse } from '../../types/types';

export const getNeweggPrice = async (itemNumber: string, browser: Browser): Promise<PriceCheckResponse> => {
  const url = `https://www.newegg.com/p/${itemNumber}`;
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const rebatePrice = await getRebatePrice(page);
    const primaryPrice = await getPrimaryPrice(page);

    const price = rebatePrice?.includes('null') ? primaryPrice : rebatePrice;

    if (!price) throw new Error('Price not found');
    await page.close();

    return { itemNumber, itemPrice: parseFloat(price), vendor: 'newegg' };
  } catch (err) {
    if (err instanceof Error) {
      console.log('Error in newegg.ts: ', err.message);
    }

    return {
      itemPrice: undefined,
      vendor: 'newegg',
      itemNumber,
    };
  }
};

const getRebatePrice = async (page: Page): Promise<string | undefined> => {
  const REBATE_DOLLAR_SELECTOR = '[class="price-note"] > span > span > strong';
  const REBATE_CENT_SELECTOR = '[class="price-note"] > span > span > sup';

  try {
    const rebateDollar = await getInnerHtml(page, REBATE_DOLLAR_SELECTOR);
    const rebateCent = await getInnerHtml(page, REBATE_CENT_SELECTOR);

    return `${rebateDollar}${rebateCent}`;
  } catch {
    return;
  }
};

const getPrimaryPrice = async (page: Page): Promise<string | undefined> => {
  const PRIMARY_DOLLAR_SELECTOR = '[class="price-current"] > strong';
  const PRIMARY_CENT_SELECTOR = '[class="price-current"] > sup';

  try {
    const primaryDollar = await getInnerHtml(page, PRIMARY_DOLLAR_SELECTOR);
    const primaryCent = await getInnerHtml(page, PRIMARY_CENT_SELECTOR);

    return `${primaryDollar}${primaryCent}`;
  } catch {
    return;
  }
};
