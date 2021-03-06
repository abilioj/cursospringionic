import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriasService } from '../services/domain/categorias.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ClienteService } from '../services/domain/cliente.service';
import { ProdutoService } from '../services/domain/produto.service';
import { AuthInterceptorProvider } from '../interceptors/AuthInterceptor';
import { CartService } from '../services/domain/cart.service';

//decaretor para declara a class pra ser modulo
@NgModule({
  declarations: [
    MyApp
    //,HomePage //- tamos usando "lazy loanding" pra  otimizar o caregamentos
    //,ListPage //- apagamos esse modulo
  ],
  imports: [
    BrowserModule,
    HttpClientModule,    
    IonicModule.forRoot(MyApp, {
      preloadModules: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
    //,HomePage
    //,ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ,CategoriasService
    ,AuthInterceptorProvider
    ,ErrorInterceptorProvider
    ,AuthService
    ,StorageService
    ,ClienteService
    ,ProdutoService
    ,CartService
  ]
})
export class AppModule {}
