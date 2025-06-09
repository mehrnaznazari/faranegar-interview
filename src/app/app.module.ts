import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import {
  effects,
  FararuCoreModule,
  FararuDesignSystemLibModule,
  FararuToastModule,
  ModalModule,
  FararuTranslateModule,
  FararuSharedModule,
  FararuGenralTemplatesModule,
  ShortcutModule,
  reducers,
} from "fararu-common-lib";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import {
  NgHttpCachingConfig,
  NgHttpCachingModule,
  NgHttpCachingStrategy,
} from "ng-http-caching";
import { HttpRequest } from "@angular/common/http";
import { LoginComponent } from "./login/login.component";
import { StoreModule } from "@ngrx/store";

const ngHttpCachingConfig: NgHttpCachingConfig = {
  lifetime: 1000 * 60 * 60 * 2, // cache expire after 120 minutes,
  cacheStrategy: NgHttpCachingStrategy.DISALLOW_ALL,
  getKey: (req: HttpRequest<unknown>): string | undefined => req.url,
};

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FararuCoreModule,
    FararuDesignSystemLibModule,
    NgHttpCachingModule.forRoot(ngHttpCachingConfig),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument(),
    FararuToastModule.forRoot(),
    FararuTranslateModule.forRoot(),
    ModalModule,
    FararuSharedModule,
    FararuGenralTemplatesModule,
    ShortcutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
