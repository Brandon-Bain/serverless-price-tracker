import { handlerWrapper } from '../utils/handlerWrapper';
import { getBrowser } from '../utils/getBrowser';
import {
  getAmazonPrice,
  getHomeDepotPrice,
  getMenardsPrice,
  getNeweggPrice,
  getSummitRacingPrice,
} from '../services/priceGetters';

const itemList: Array<{ itemNumber: string; vendor: keyof typeof vendorFunctionMap }> = [
  { itemNumber: '301453855', vendor: 'homedepot' },
  { itemNumber: 'B00LSEBYHU', vendor: 'amazon' },
  { itemNumber: '2114514', vendor: 'menards' },
  { itemNumber: 'cle-cb663p8', vendor: 'summitracing' },
  { itemNumber: 'N82E16814932414', vendor: 'newegg' },
];

const vendorFunctionMap = {
  amazon: getAmazonPrice,
  homedepot: getHomeDepotPrice,
  menards: getMenardsPrice,
  summitracing: getSummitRacingPrice,
  newegg: getNeweggPrice,
};

const myfunc = async (): Promise<void> => {
  const browser = await getBrowser();

  for (const lineItem of itemList) {
    const getterFunction = vendorFunctionMap[lineItem.vendor];
    const value = await getterFunction(lineItem.itemNumber, browser);
    console.log(value);
  }

  await browser.close();
};

exports.handler = handlerWrapper(myfunc);
