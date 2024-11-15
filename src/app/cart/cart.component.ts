import { Component } from '@angular/core';
import { DataService } from '../data.service';  // Import CartService
import { CartItem } from '../models/cart-item.model';  // Import CartItem model
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderconfirmedComponent } from '../orderconfirmed/orderconfirmed.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: DataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Fetch cart items from CartService on component initialization
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });

    // Calculate the total price
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  // Method to confirm the order
  confirmOrder() {
    console.log(this.getTotalPrice());

    if(this.getTotalPrice()!=0){
      this.cartService.confirmOrder(); 
      const dialogRef = this.dialog.open(OrderconfirmedComponent, {
        width: '700px',
        data: { msg: 'Order confirmed! Thank you for shopping.' },
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.returnToProductPage()
        }
      });
    }else{
      const dialogRef = this.dialog.open(OrderconfirmedComponent, {
        width: '700px',
        data: { msg: 'Add products from Product List.' },
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.returnToProductPage()
        }
      });
    }

  }

  // Method to remove an item from the cart
  removeFromCart(productId: number) {
    this.cartService.removeCartItem(productId); 
  }

  // Navigate back to the Product Page
  returnToProductPage(): void {
    this.router.navigate(['/products']); 
  }

  // Calculate the total price of items in the cart
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  updateQuantity(item: CartItem): void {
    this.cartService.updateCartItem(item);  // Update the cart with the new quantity
  }

  logout() {
    // Clear the localStorage or sessionStorage to log the user out
    sessionStorage.clear();
    localStorage.clear()

    // Redirect to login page (or wherever appropriate)
    this.router.navigate(['/login']);
  }
}
