import {createAction, props} from "@ngrx/store";
import {Ticker} from "../model/ticker.model";

export const GET_ALL_TICKERS: string = '[Tickers] Get tickers';
export const GET_ALL_TICKERS_SUCCESS: string = '[Tickers] Get tickers success';
export const GET_ALL_TICKERS_FAIL: string = '[Tickers] Get tickers fail';
export const SELECT_STOCK_EXCHANGE: string = '[Tickers] Select stock exchange'
export const SELECT_TICKER: string = '[Tickers] Select ticker'
export const SELECT_DATE: string = '[Tickers] Select date'

export const getAllTickers = createAction(GET_ALL_TICKERS);
export const getAllTickersFail = createAction(
  GET_ALL_TICKERS_FAIL,
  props<{errorMessage: string}>()
);
export const getAllTickersSuccess = createAction(
  GET_ALL_TICKERS_SUCCESS,
  props<{tickersList: Ticker[]}>()
);
export const setSelectedStockExchange = createAction(
  SELECT_STOCK_EXCHANGE,
  props<{stockExchangeCode: string}>()
);
export const setSelectedTicker = createAction(
  SELECT_TICKER,
  props<{tickerCode: string}>()
);
export const setSelectedDate = createAction(
  SELECT_DATE,
  props<{date: string}>()
);
