import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ProductModel } from '../models/product.model';
import { Router } from '@angular/router';
import { CartItem } from '../models/cart-item.model';
import { MatDialog } from '@angular/material/dialog';
import { WelcomePopupComponent } from '../welcome-popup/welcome-popup.component';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent {

  products: ProductModel[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.products = this.dataService.getProducts();

    this.products.forEach(product => {
      product.quantity = product.quantity || 1;
    });

    if(sessionStorage.getItem('userStatus')=='no'){
      const dialogRef = this.dialog.open(WelcomePopupComponent, {
        width: '700px',
        data: { },
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          sessionStorage.setItem('userStatus','yes')
        }
      })
    }
  }

  addToCart(product: ProductModel) {
    if (product.quantity > 0) {
      const updatedProduct: CartItem = {
        product: product,  
        quantity: product.quantity  
      };
    
      this.dataService.updateCartItem(updatedProduct); 
      this.router.navigate(['/cart']); 
    }
  }

  increaseQuantity(product: ProductModel) {
    product.quantity = (product.quantity || 1) + 1;
  }

  decreaseQuantity(product: ProductModel) {
    if ((product.quantity || 1) > 1) {
      product.quantity--;
    }
  }

  navigateDetails(productId: any){
    this.router.navigate(['/productdetails'], { queryParams: {id: productId}});
  }

  // Logout method to clear session or localStorage and redirect to login page
  logout() {
    // Clear the localStorage or sessionStorage to log the user out
    sessionStorage.clear();
    localStorage.clear()

    // Redirect to login page (or wherever appropriate)
    this.router.navigate(['/login']);
  }

}
