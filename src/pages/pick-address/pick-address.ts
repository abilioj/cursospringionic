import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PickAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        logradouro: "rua a",
        numero: "300",
        bairro: "jaiara",
        cep: "75000000",
        cidade: {
          id: "1",
          nome: "anapolis",
          estado: {
            id: "1",
            nome: "goias"
          }
        }
      },
      {
        id: "2",
        logradouro: "rua b",
        numero: "50",
        bairro: "jaiara",
        cep: "75000000",
        cidade: {
          id: "1",
          nome: "anapolis",
          estado: {
            id: "1",
            nome: "goias"
          }
        }
      }
    ]
  }

}
