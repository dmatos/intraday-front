import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {provideAnimations} from '@angular/platform-browser/animations';
import {ActionReducerMap, provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {NavbarComponent} from "./component/navbar/navbar.component";
import {MatNativeDateModule} from "@angular/material/core";
import {AppModel} from "./model/app-model.model";
import {AppReducer} from "./store/app.reducer";
import {AppEffects} from "./store/app.effects";
import {HttpClientModule} from "@angular/common/http";

interface AppFeatures {
  appStateFeature: AppModel
}

export const reducers: ActionReducerMap<AppFeatures> = {
  appStateFeature: AppReducer
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      {path: '', component: NavbarComponent, pathMatch: 'full'},
    ]),
    provideAnimations(),
    provideStore(reducers),
    provideEffects([AppEffects]),
    importProvidersFrom(MatNativeDateModule, HttpClientModule)
  ]
};
