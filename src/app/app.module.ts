import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {ToolbarModule} from './components/toolbar/toolbar.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AtlasModule} from './view/atlas/atlas.module';
import {ProfileModule} from './view/profile/profile.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FooterModule} from './components/footer/footer.module';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToolbarModule,
    HttpClientModule,
    AtlasModule,
    ProfileModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'ua'
    }),
    FooterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
