import chromium from 'chrome-aws-lambda';
import { addExtra } from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const puppeteerExtra = addExtra(chromium.puppeteer);
puppeteerExtra.use(StealthPlugin());

export const getBrowser = async () => {
  return await puppeteerExtra.launch();
};
