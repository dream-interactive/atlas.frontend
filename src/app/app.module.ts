import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './routes/app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {ToolbarModule} from './components/toolbar/toolbar.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ProfileModule} from './pages/profile/profile.module';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FooterModule} from './components/footer/footer.module';
import {AboutModule} from './pages/about/about.module';
import {StartModule} from './pages/start/start.module';
import {OrganizationModule} from './pages/organization/organization.module';
import {AuthRoutingModule} from './routes/auth-routing.module';
import {HomeModule} from './pages/home/home.module';
import {DocRoutingModule} from './routes/doc-routing.module';
import {DocumentationModule} from './pages/documentation/documentation.module';
import {HIGHLIGHT_OPTIONS, HighlightModule} from 'ngx-highlightjs';
import {PageNotFoundModule} from './pages/page-not-found/page-not-found.module';
import {PageNotFoundRoutingModule} from './routes/pnf-routing.module';
import {ProjectRoutingModule} from './routes/project-routing.module';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),

    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ToolbarModule,
    AboutModule,
    ProfileModule,
    FooterModule,
    StartModule,
    OrganizationModule,
    HomeModule,
    DocumentationModule,
    HighlightModule,
    PageNotFoundModule,


    AuthRoutingModule,
    AppRoutingModule,
    ProjectRoutingModule,
    DocRoutingModule,
    PageNotFoundRoutingModule // PageNotFoundRoutingModule should be last of RoutingModules
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
