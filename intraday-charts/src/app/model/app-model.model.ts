export interface AppModel{
  stockExchangeToTickersMap: Map<string,string[]>,
  date: string,
  selectedTicker: string,
  selectedStockExchange: string,
  errorMessage: string
}
