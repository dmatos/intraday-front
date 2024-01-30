import {createReducer, on} from "@ngrx/store";
import {
  getAllTickersFail,
  getAllTickersSuccess,
  setSelectedDate,
  setSelectedStockExchange,
  setSelectedTicker
} from "./app.actions";
import {AppState} from "./app.state";
import {Ticker} from "../model/ticker.model";

const _AppReducer = createReducer(AppState,
  on(getAllTickersSuccess, (state, action) => {
    const se2tickersMap = new Map<string,string[]>();
    action.tickersList.forEach( (ticker:Ticker) => {
      let tickers = se2tickersMap.get(ticker.stockExchangeCode);
      if(!!tickers){
        se2tickersMap.set(ticker.stockExchangeCode, [...tickers, ticker.code]);
      } else {
        se2tickersMap.set(ticker.stockExchangeCode, [ticker.code]);
      }
    })
    return {
      ...state,
      stockExchangeToTickersMap: se2tickersMap
    }
  }),
  on(getAllTickersFail, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage
    }
  }),
  on(setSelectedStockExchange, (state, action) => {
    return{
      ...state,
      selectedStockExchange: action.stockExchangeCode
    }
  }),
  on(setSelectedTicker, (state, action) => {
    return {
      ...state,
      selectedTicker: action.tickerCode
    }
  }),
  on(setSelectedDate, (state, action) => {
    return {
      ...state,
      date: action.date
    }
  })
)

export function AppReducer(state: any, action: any){
  return _AppReducer(state, action);
}
