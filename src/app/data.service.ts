import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductModel } from './models/product.model';
import { CartItem } from './models/cart-item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private products: ProductModel[] = [
    { id: 1, name: 'Product 1', price: 100, description: 'Description 1', imageUrl: 'assets/img1.jpg', quantity: 1 },
    { id: 2, name: 'Product 2', price: 200, description: 'Description 2', imageUrl: 'assets/img2.jpg', quantity: 1 },
    { id: 3, name: 'Product 3', price: 400, description: 'Description 3', imageUrl: 'assets/img3.jpg', quantity: 1 },
    { id: 4, name: 'Product 4', price: 280, description: 'Description 4', imageUrl: 'assets/img4.jpg', quantity: 1 },
    { id: 5, name: 'Product 5', price: 80, description: 'Description 5', imageUrl: 'assets/img5.jpg', quantity: 1 },
    { id: 6, name: 'Product 6', price: 370, description: 'Description 6', imageUrl: 'assets/img6.jpg', quantity: 1 },
    { id: 7, name: 'Product 7', price: 65, description: 'Description 7', imageUrl: 'assets/img2.jpg', quantity: 1 },
    { id: 8, name: 'Product 8', price: 30, description: 'Description 8', imageUrl: 'assets/img6.jpg', quantity: 1 },
    // more products...
  ];

  // Cart items observable
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable(); // Expose as Observable



  constructor(
    private http: HttpClient
  ) {
    // Load initial cart data from local storage if available
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      this.cartItemsSubject.next(JSON.parse(storedCart));
    }
    this.loadCartFromLocalStorage();  // Load cart from localStorage when app starts
  }

  // // Get all products
  getProducts(): ProductModel[] {
    return this.products;
  }


  // Add product to cart with specified quantity
  addToCart(product: ProductModel, quantity: number) {
    const currentCart = this.cartItemsSubject.value;

    // Find existing item in the cart based on product ID
    const existingItem = currentCart.find((item) => item.product.id === product.id);

    if (existingItem) {
      // Update the quantity if the item already exists in the cart
      existingItem.quantity += quantity;
    } else {
      // Create a new CartItem and add it to the cart if it doesn’t exist
      const cartItem: CartItem = { product, quantity };
      currentCart.push(cartItem);
    }

    // Update the cart
    this.cartItemsSubject.next(currentCart);  // Update the cart in the BehaviorSubject
    this.saveCartToLocalStorage()
  }


  removeFromCart(productId: number): void {
    // Filter out the cart item by matching productId with item.product.id
    const updatedCart = this.cartItemsSubject.value.filter((item) => item.product.id !== productId);
  
    // Update the cart with the filtered list
    this.updateCart(updatedCart);
  }

  // Update cart data and save to local storage
  private updateCart(cartItems: CartItem[]) {
    this.cartItemsSubject.next(cartItems);
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
  }

  // Get cart items (can be from localStorage or memory)
  getCartItems(): CartItem[] {
    // return this.cartItems;
    return this.cartItemsSubject.value; // Get the current value of the cart items

  }

  // Update cart item with new quantity
    updateCartItem(updatedItem: CartItem): void {
      const cartItems = this.cartItemsSubject.value;

      // Check if the item already exists
      const existingItemIndex = cartItems.findIndex(item => item.product.id === updatedItem.product.id);
      if (existingItemIndex !== -1) {
        // Replace the old cart item with the updated one
        cartItems[existingItemIndex] = updatedItem;
      } else {
        // If the item doesn't exist, add it to the cart
        cartItems.push(updatedItem);
      }

      // Update the cart in local storage and the subject
      this.saveCartToLocalStorage();
      this.cartItemsSubject.next(cartItems);
    }


  // Save cart items to localStorage
  private saveCartToLocalStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemsSubject.value));
  }


  // Load cart items from localStorage
  private loadCartFromLocalStorage(): void {
    const cartData = localStorage.getItem('cartItems');
    if (cartData) {
      this.cartItemsSubject.next(JSON.parse(cartData)); // Use .next() to update cartItemsSubject
    }
  }

  // Confirm order (for example, clear the cart)
  confirmOrder(): void {
    this.cartItemsSubject.next([]);  // Clear the cart
    this.saveCartToLocalStorage();  // Optionally clear cart in localStorage
  }

  removeCartItem(productId: number): void {
    const updatedCart = this.cartItemsSubject.value.filter(item => item.product.id != productId);
    this.cartItemsSubject.next(updatedCart);  // Emit updated cart items
    this.saveCartToLocalStorage();  // Optionally save to localStorage
    this.getTotalPrice()
  }

  getTotalPrice(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

}
