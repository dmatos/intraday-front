import {AppModel} from "../model/app-model.model";

export const AppState: AppModel = {
  stockExchangeToTickersMap: new Map<string,string[]>(),
  date: new Date().toISOString(),
  selectedTicker: "",
  selectedStockExchange: "",
  errorMessage: ""
}
