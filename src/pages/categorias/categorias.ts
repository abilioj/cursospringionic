import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriasService } from '../../services/domain/categorias.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriasService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {});
  }

  showProdutos(categoria_id : string) {
    this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});    
  }
}
