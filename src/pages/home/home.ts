import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  
  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController
    , public menu: MenuController
    , public auth: AuthService
    ) {}
  
  // trava menu lateral-begin
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
  // trava menu lateral-rnd

  ionViewDidEnter(){
/*     this.auth.refreshToken()
    .subscribe(response => {
      this.navCtrl.setRoot('CategoriasPage')//naverga pra pagina categoria
    },
    error => {}); */
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage')//naverga pra pagina categoria
      },
      error => {});  
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }

}
