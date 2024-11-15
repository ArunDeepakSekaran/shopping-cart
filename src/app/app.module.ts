import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderconfirmedComponent } from './orderconfirmed/orderconfirmed.component';
import { MatDialogModule } from '@angular/material/dialog';
import { WelcomePopupComponent } from './welcome-popup/welcome-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductListingComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderconfirmedComponent,
    WelcomePopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
  bootstrap: [AppComponent]
})
export class AppModule { }
