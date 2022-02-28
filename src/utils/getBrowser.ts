import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

import type { VanillaPuppeteer } from 'puppeteer-extra';

puppeteer.use(StealthPlugin());

export const getBrowser = async (): Promise<ReturnType<VanillaPuppeteer['launch']>> => {
  return await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
};
