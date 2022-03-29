import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  type: string = '';
  productName: string = '';
  products!: Observable<any>;
  constructor(public productsServ: ProductsService, private router: Router) { }

  

  ngOnInit(): void {
    this.products = this.productsServ.getAll();
  }

  setType(type: string, event?: any) {

    if(event) {
      const elements = document.querySelectorAll('.anchor');
      elements.forEach(item => item.classList.remove('active'));
      event.target.classList.add('active');
    }

    this.type = type;
    if(this.type != 'Корзина') {
      this.router.navigate(['/'], {
        queryParams: {
          type: this.type
        }
      })
    }
    this.productsServ.setType(this.type);
  }

}
