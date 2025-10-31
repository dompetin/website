export type ComparisonCard = {
  name: string;
  rate: number; // percentage
  subtitle: string; // bank name, ticker, fund code, etc.
};

export type BankData = {
  cards: ComparisonCard[];
  lastUpdated: string; // ISO timestamp
};

export type StockData = {
  cards: ComparisonCard[];
  lastUpdated: string;
};

export type FundData = {
  cards: ComparisonCard[];
  lastUpdated: string;
};

export type BondData = {
  cards: ComparisonCard[];
  lastUpdated: string;
};

export type GoldData = {
  cards: ComparisonCard[];
  lastUpdated: string;
};

export type CryptoData = {
  cards: ComparisonCard[];
  lastUpdated: string;
};
