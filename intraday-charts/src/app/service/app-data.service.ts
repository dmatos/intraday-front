import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http"
import {environment} from "../../environments/environment";
import {Ticker} from "../model/ticker.model";

@Injectable({providedIn: 'root'})
export class AppDataService {

  constructor(private httpClient: HttpClient){
  }

  getAllTickers() {
    return this.httpClient.get<Ticker[]>(environment.apiUrl+'/intraday/tickers/search/_');
  }
}
