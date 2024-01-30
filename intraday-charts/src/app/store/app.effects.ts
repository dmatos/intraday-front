import {Injectable} from "@angular/core";
import {AppDataService} from "../service/app-data.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {getAllTickers, getAllTickersFail, getAllTickersSuccess} from "./app.actions";
import {catchError, map, of, switchAll} from "rxjs";

@Injectable()
export class AppEffects{
  constructor(
    private action$: Actions,
    private service: AppDataService) {
  }

  _getAllTickers = createEffect(() =>
    this.action$.pipe(
      ofType(getAllTickers),
      map(() => {
        return this.service.getAllTickers().pipe(
          map((data) => {
            return getAllTickersSuccess({tickersList: data});
          }),
          catchError((_error) => of(getAllTickersFail({errorMessage: _error.message})))
        )
      }),
      switchAll()
    )
  )
}
