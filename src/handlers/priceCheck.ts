import { handlerWrapper } from '../utils/handlerWrapper';
import { getHomeDepotPrice } from '../services/homedepot';
import { getBrowser } from '../utils/getBrowser';

const myfunc = async () => {
  const browser = await getBrowser();

  const faucetItemNumber = '301453855';
  const faucetPrice = await getHomeDepotPrice(faucetItemNumber, browser);
  console.log(faucetPrice);
  await browser.close();
};

exports.handler = handlerWrapper(myfunc);
