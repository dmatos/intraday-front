import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppModel} from "../model/app-model.model";

const appFeatureSelector = createFeatureSelector<AppModel>('appStateFeature')

export const selectStockExchangesList = createSelector(
  appFeatureSelector,
  (appState) => {
    return appState.stockExchangeToTickersMap.keys();
  }
)

export const selectStockExchange = createSelector(
  appFeatureSelector,
  (appState) => {
    return appState.selectedStockExchange;
  }
)

export const selectTickersList = createSelector(
  appFeatureSelector,
  (appState): string[] => {
    if(!!appState.selectedStockExchange && appState.selectedStockExchange.length > 0){
      const tickers = appState.stockExchangeToTickersMap.get(appState.selectedStockExchange);
      if(!!tickers){
        return tickers;
      }
    }
    return [];
  }
)
