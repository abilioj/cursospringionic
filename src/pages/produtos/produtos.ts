import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , public produtosService: ProdutoService
  ) {
  }

  ionViewDidLoad() {
    console.clear();
    let categoria_id = this.navParams.get('categoria_id');
    this.produtosService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrls();
      });
  }

  loadImageUrls() {
    // loadImageUrls(start: number, end: number) {
    // for (var i = start; i <= end; i++) {
    for (var i = 0; i <= this.items.length; i++) {

      try {
        let item = this.items[i];
        this.produtosService.getSmallImageFromBucket(item.id)
          .subscribe(response => {
            item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
          },error => {});
      } catch (e) {

      }

    }
    //}
  }

}
