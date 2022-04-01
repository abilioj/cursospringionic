import { CartService } from './../../services/domain/cart.service';
import { PedidoDTO } from './../../models/pedido.dto';
import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
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
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public storage: StorageService
    , public clienteService: ClienteService
    ,public cartService: CartService
    ) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos']
          let cart = this.cartService.getCart()
          this.pedido = {
            cliente: {id: response['id']},
            enderecoDeEntrega: null,
            pagamento: null,
            itens: cart.items.map(x => {
              return {
                quantidade: x.quantidade,
                produto: {id: x.produto.id}
              }
            })
          }
        },
          error => {
            if (error.status == 403) {
            }
          });
    } else {
    }
  }

  nextPage(item: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id: item.id}
    console.log(this.pedido)
  }

}

/*
[
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
*/