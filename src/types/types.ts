

export type PriceCheckResponse = {
  itemPrice: number | undefined; // Number is expected. Undefined is used in errors
  vendor: string;
  itemNumber: string;
};

export type ItemList = {
  itemNumber: '301453855',
  vendor: 'homedepot',
}