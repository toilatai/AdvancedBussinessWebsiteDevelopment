import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  products: any[] = [];
  cart: any[] = [];
  total: number = 0;
  message: string = '';
  currentView: string = 'products'; // 'products' or 'cart'
  serverUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.initCart();
    this.loadProducts();
    this.loadCart();
  }

  // Initialize cart in session
  initCart() {
    this.http.post(`${this.serverUrl}/cart/init`, {}, { withCredentials: true }).subscribe(
      (response: any) => {
        console.log('Cart initialized:', response);
      },
      (error) => {
        console.log('Cart init error (not critical):', error);
      }
    );
  }

  // Load all products from server
  loadProducts() {
    this.http.get(`${this.serverUrl}/products`).subscribe(
      (response: any) => {
        this.products = response || [];
        console.log('Products loaded:', this.products);
      },
      (error) => {
        console.error('Error loading products:', error);
        this.message = 'Error loading products: ' + (error.message || error.statusText);
      }
    );
  }

  // Load cart from session
  loadCart() {
    this.http.get(`${this.serverUrl}/cart`, { withCredentials: true }).subscribe(
      (response: any) => {
        this.cart = response.cart || [];
        this.total = response.total || 0;
        console.log('Cart loaded:', this.cart, 'Total:', this.total);
      },
      (error) => {
        console.log('No cart found');
      }
    );
  }

  // Add product to cart
  addToCart(product: any) {
    const item = {
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1
    };

    this.http.post(`${this.serverUrl}/cart/add`, item, { withCredentials: true }).subscribe(
      (response: any) => {
        if (response.success) {
          this.message = product.name + ' added to cart!';
          this.loadCart();
        }
      },
      (error) => {
        console.error('Error adding to cart:', error);
        this.message = 'Error adding to cart: ' + (error.message || error.statusText);
      }
    );
  }

  // Update quantity in cart
  updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) {
      this.removeFromCart(productId);
      return;
    }

    const updateData = { productId, quantity };
    this.http.post(`${this.serverUrl}/cart/update`, updateData, { withCredentials: true }).subscribe(
      (response: any) => {
        if (response.success) {
          this.loadCart();
        }
      },
      (error) => {
        console.error('Error updating cart:', error);
        this.message = 'Error updating cart: ' + (error.message || error.statusText);
      }
    );
  }

  // Remove product from cart
  removeFromCart(productId: string) {
    const removeData = { productId };
    this.http.post(`${this.serverUrl}/cart/remove`, removeData, { withCredentials: true }).subscribe(
      (response: any) => {
        if (response.success) {
          this.message = 'Product removed from cart';
          this.loadCart();
        }
      },
      (error) => {
        console.error('Error removing from cart:', error);
        this.message = 'Error removing from cart: ' + (error.message || error.statusText);
      }
    );
  }

  // Checkout
  checkout() {
    this.http.post(`${this.serverUrl}/cart/checkout`, {}, { withCredentials: true }).subscribe(
      (response: any) => {
        if (response.success) {
          this.message = 'Checkout successful! Total: $' + response.order.total;
          this.loadCart();
          this.currentView = 'products';
        } else {
          this.message = response.message;
        }
      },
      (error) => {
        console.error('Error during checkout:', error);
        this.message = 'Error during checkout: ' + (error.message || error.statusText);
      }
    );
  }

  // Switch view
  switchView(view: string) {
    this.currentView = view;
  }

  // Get cart count
  getCartCount() {
    return this.cart.length;
  }
}
