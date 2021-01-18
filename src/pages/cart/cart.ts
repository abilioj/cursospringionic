import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoService } from '../../services/domain/produto.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public cartService: CartService
    , public produtosService: ProdutoService
    ,public storage: StorageService
  ) {
  }

  ionViewDidLoad() {
    let cart = this.storage.getCart();
    // let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (var i = 0; i <= this.items.length; i++) {
      try {
        let item = this.items[i];
        this.produtosService.getSmallImageFromBucket(item.produto.id)
          .subscribe(response => {
            item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
          }, error => { });
      } catch (e) {

      }
    }
  }
}
