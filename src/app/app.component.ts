import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

//import { HomePage } from '../pages/home/home'; // - tamos usando "lazy loanding" pra  otimizar o caregamentos
//import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //  rootPage: any = HomePage; 
  // - tamos usando "lazy loanding" pra  otimizar o caregamentos
  rootPage: string = 'HomePage'

  //pages: Array<{title: string, component: any}>; //- tamos usando "lazy loanding" pra  otimizar o caregamentos
  pages: Array<{ title: string, component: string }>;

  constructor(
    public platform: Platform
    , public statusBar: StatusBar
    , public splashScreen: SplashScreen
    , public auth: AuthService
    , app: App
    ) {
      this.platform.ready().then(() => {
          this.platform.registerBackButtonAction(() => {
              app.navPop();
          });
      });

    this.initializeApp();

    // usado para um exemplo de ngFor e navegação
    this.pages = [
      //{ title: 'Home', component: 'HomePage' },
      { title: 'Categorias', component: 'CategoriasPage' }
      , { title: 'Profile', component: 'ProfilePage' }
      // , { title: 'Produtos', component: 'ProdutosPage'}
      , { title: 'Carrinho', component: 'CartPage'}
      , { title: 'Logout', component: '' }
      //,{ title: 'List', component: ListPage } // - tamos usando "lazy loanding" pra  otimizar o caregamentos
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Ok, então a plataforma está pronta e nossos plugins estão disponíveis.
      // Aqui você pode fazer qualquer coisa nativa de nível superior de que possa precisar.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // Redefina a navegação de conteúdo para ter apenas esta página
  // não queremos que o botão Voltar apareça neste cenário
  openPage(page: { title: string, component: string }) {
    switch (page.title) {
      case 'Logout':
        this.auth.logout();
        this.nav.setRoot('HomePage');
        break;
      default:
        this.nav.setRoot(page.component);
    }
  }
}
