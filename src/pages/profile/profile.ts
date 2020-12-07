import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from './../../models/cliente.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  imageUrlDefull: string;
  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public storage: StorageService
    , public clienteService: ClienteService
  ) {
  }

  ionViewDidLoad() {
    this.imageUrlDefull = 'assets/imgs/avatar-blank.png';
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {
        this.cliente = response;
        this.getImageIfExists();
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
    }else{
      this.navCtrl.setRoot('HomePage');
    }
  }

  //pega a imgem la no S3 Amazon
  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${parseInt(this.cliente.id)}.jpg`;
    },
    error => {});
  }
}
