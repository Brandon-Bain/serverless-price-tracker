import { getAmazonPrice, getHomeDepotPrice, getMenardsPrice, getSummitRacingPrice } from '../services/priceGetters';
import { handlerWrapper } from '../utils/handlerWrapper';
import { getBrowser } from '../utils/getBrowser';

const itemList: Array<{ itemNumber: string; vendor: keyof typeof vendorFunctionMap }> = [
  { itemNumber: '301453855', vendor: 'homedepot' },
  { itemNumber: 'B00LSEBYHU', vendor: 'amazon' },
  { itemNumber: '2114514', vendor: 'menards' },
  { itemNumber: 'cle-cb663p8', vendor: 'summitracing' },
];

const vendorFunctionMap = {
  amazon: getAmazonPrice,
  homedepot: getHomeDepotPrice,
  menards: getMenardsPrice,
  summitracing: getSummitRacingPrice,
};

const myfunc = async (): Promise<void> => {
  const browser = await getBrowser();

  const promises = await Promise.all(
    itemList.map(async ({ itemNumber, vendor }) => {
      const getterFunction = vendorFunctionMap[vendor];
      return await getterFunction(itemNumber, browser);
    })
  );

  console.log(promises);

  await browser.close();
};

exports.handler = handlerWrapper(myfunc);
