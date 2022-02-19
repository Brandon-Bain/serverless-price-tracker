export type PriceCheckResponse = {
  itemPrice: number | undefined; // Number is expected. Undefined is used in errors
  vendor: string;
  itemNumber: string;
};
