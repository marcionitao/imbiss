import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { ProductProvider } from '../../providers/product/product'
import { Product } from '../../model/product';
import { EditProductPage } from '../edit-product/edit-product';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: any[] = [];
  onlyInactives: boolean = false;
  searchText: string = null;

  constructor(public navCtrl: NavController, private toast: ToastController, private productProvider: ProductProvider) { }

  ionViewDidEnter() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productProvider.getAll(!this.onlyInactives, this.searchText)
      .then((result: any[]) => {
        console.log('Conteudos : '+this.products);
        this.products = result;
      });
  }

  addProduct() {
    this.navCtrl.push(EditProductPage);
    console.log('botão carregado!!!!');
  }

  editProduct(id: number) {
    this.navCtrl.push(EditProductPage, { id: id });
  }

  removeProduct(product: Product) {
    this.productProvider.remove(product.id)
      .then(() => {
        // Removendo do array de produtos
        var index = this.products.indexOf(product);
        this.products.splice(index, 1);
        this.toast.create({ message: 'Produto removido.', duration: 3000, position: 'botton' }).present();
      })
  }

  filterProducts(ev: any) {
    this.getAllProducts();
  }

}
