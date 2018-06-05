import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { DatabaseProvider } from '../providers/database/database';
import { ProductProvider } from '../providers/product/product';
import { CategoryProvider } from '../providers/category/category';
import { EditProductPage } from '../pages/edit-product/edit-product';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditProductPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditProductPage
  ],
  providers: [
    StatusBar,                                                                              
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'DE'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    ProductProvider,
    CategoryProvider
  ]
})
export class AppModule {}
