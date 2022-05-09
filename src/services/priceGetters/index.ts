import { getAmazonPrice } from './amazon';
import { getHomeDepotPrice } from './homedepot';
import { getMenardsPrice } from './menards';
import { getSummitRacingPrice } from './summitRacing';
import { getNeweggPrice } from './newegg';

export { getAmazonPrice, getHomeDepotPrice, getMenardsPrice, getSummitRacingPrice, getNeweggPrice };

/**
 * Walmart is a no go. Instant detection and infinite captcha loop with all bypasses in place
 */
