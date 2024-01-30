import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ticker} from "../model/ticker.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  constructor(private httpClient: HttpClient){
  }

  getAllTickers() {
    return this.httpClient.get<Ticker[]>(environment.apiUrl+'/intraday/tickers/search/_');
  }
}
