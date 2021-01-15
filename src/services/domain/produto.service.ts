import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdutoDTO } from '../../models/produto.dto';
import { StorageService } from '../storage.service';

@Injectable()
export class ProdutoService {

    produtos: ProdutoDTO;

    constructor(
        public storage: StorageService
        ,public http: HttpClient
        ) {
    }
    
  findById(produto_id : string) {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
  }
  
  findByCategoria(categoria_id : string) {
    let page : number = 0;let linesPerPage : number = 24;
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
  }
  
  getSmallImageFromBucket(id : number) : Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`
    return this.http.get(url, {responseType : 'blob'});
  }  

}
