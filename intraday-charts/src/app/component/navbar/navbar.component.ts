import {Component, Injectable, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatDatepickerInputEvent, MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {AsyncPipe, CommonModule, formatDate} from "@angular/common";
import {select, Store} from "@ngrx/store";
import {selectStockExchange, selectStockExchangesList, selectTickersList} from "../../store/app.selector";
import {ActivatedRoute} from "@angular/router";
import {DateAdapter, NativeDateAdapter} from '@angular/material/core';
import {getAllTickers, setSelectedDate, setSelectedStockExchange, setSelectedTicker} from "../../store/app.actions";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {MatIconModule} from "@angular/material/icon";

@Injectable()
class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
    return formatDate(date,'yyyy-MM-dd', this.locale);
  }
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    AsyncPipe,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { subscriptSizing: 'dynamic'} }
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation : ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit{

  @Input() date: string | undefined;
  @Input() stockExchanges: string[] = [];
  @Input() tickers: string[] = [];
  stockExchangeFormControl = new FormControl();
  tickerFormControl = new FormControl();
  filteredStockExchanges: Observable<string[]> = new Observable<string[]>();
  filteredTickers: Observable<string[]> = new Observable<string[]>();

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>) {
    this.date = new Date().toISOString().slice(0, 10);
    this.store.pipe(select(selectStockExchangesList)).subscribe(
      (stockExchanges) => {
        this.stockExchanges = [...stockExchanges];
        if(!this.stockExchangeFormControl.getRawValue()){
          this.stockExchangeFormControl.setValue("");
        }
      }
    );
    this.store.pipe(select(selectTickersList)).subscribe(
      (tickers) => {
        this.tickers = tickers;
        this.tickerFormControl.setValue("");
      }
    );
    this.store.pipe(select(selectStockExchange)).subscribe(
      (stockExchangeCode: string) => {
        this.stockExchangeFormControl.setValue(stockExchangeCode);
      }
    )
  }


  ngOnInit(): void {
    this.store.dispatch(getAllTickers());
    this.filteredStockExchanges = this.stockExchangeFormControl.valueChanges.pipe(
      map(value => this._filterStockExchanges(value))
    );
    this.filteredTickers = this.tickerFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterTickers(value))
    );
  }

  private _filterStockExchanges(value:string): string[]{
    if(!value || value.length ==  0){
      return this.stockExchanges;
    }
    const filterValue = value.toUpperCase();
    return this.stockExchanges.filter(option => option.toUpperCase().includes(filterValue));
  }

  private _filterTickers(value:string): string[]{
    const filterValue = value.toUpperCase();
    return this.tickers.filter(option => option.toUpperCase().includes(filterValue));
  }

  onDateEvent(event: MatDatepickerInputEvent<Date>){
    const dateStr = event.value?.toISOString();
    const date = dateStr?.slice(0, 10);
    if(!!date) {
      this.date = date;
      this.store.dispatch(setSelectedDate({date}))
    }
  }

  daysFilter = (date: Date | null) => {
    const day = date?.getDay();
    return day !== 0 && day != 6;
  }

  selectStockExchangeOption(event: MatAutocompleteSelectedEvent){
    let stockExchangeCode:string = event.option.value;
    this.store.dispatch(setSelectedStockExchange({stockExchangeCode}));
  }

  selectTickerOption(event: MatAutocompleteSelectedEvent) {
    let tickerCode:string = event.option.value;
    this.store.dispatch(setSelectedTicker({tickerCode}));
  }
}
