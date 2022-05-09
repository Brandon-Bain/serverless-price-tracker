import type { Page } from 'puppeteer';

export const getInnerHtml = async (page: Page, selector: string): Promise<string | null> => {
  return await page.evaluate((priceSelector) => {
    if (!document) throw new Error('Document was undefined');
    const element = document.querySelector(priceSelector);
    if (!element) return null;
    return element.innerHTML;
  }, selector);
};
