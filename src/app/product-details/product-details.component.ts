import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  product: any = null;
  quantity = 1;
  sub: any;
  productArray: any;
  sampleDescription: string = "This is a high-quality product that meets all industry standards. Perfect for daily use and suitable for a wide range of customers.";

  constructor(
    private route: ActivatedRoute,
    private productService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.route.queryParams
      .subscribe((params:any) =>{
        const id = params['id']
        console.log(id,'id');

        this.productArray = this.productService.getProducts();
        this.product = this.productArray.find((p: any) => p.id == id);
      });    
  }

  returnToProductPage() {
    this.router.navigate(['/products']);
  }
  
}
