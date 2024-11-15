# ShoppingCart

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Login Component

# Oviewview:

    Basic login system, allowing users to enter a username and password to authenticate and access the application. The login process includes a username/password validation, password visibility toggle, and error handling for invalid login attempts. Successful login sets session data and redirects the user to the products page.

# Features:

    Two-Way Data Binding: Captures user input for the username and password fields using Angular's [(ngModel)].
    Password Visibility Toggle: A clickable icon to toggle between showing and hiding the password.
    Login Validation: Checks the entered username and password against predefined credentials ( 
        username - scart
        password - scart123@
    ).
    Error Handling: Displays an error message if the login credentials are invalid.
    Session Management: On successful login, the user's data (e.g., login status and username) is stored in sessionStorage to persist the session.
    Redirect: After a successful login, the user is redirected to the /products page.


## product-list Component

# Overview:

    The Product Listing component displays a list of products, including their image, name, description, price, and an "Add to Cart" button. It also includes a Details button for each product to navigate to the product's detailed view. Additionally, it handles user session management, product quantity adjustments, and user logout functionality.

# Key Features:

    Product Listing: Displays product details (name, description, price, image) for each item in the list.
    Add to Cart: Allows users to add a product with a specified quantity to the shopping cart.
    Product Details: A "Details" button that navigates to a dedicated product details page with the product's ID passed as a query parameter.
    Welcome Popup: If it's the user's first time logging in (based on userStatus in sessionStorage), a welcome popup is displayed.
    Logout: Clears the session data and redirects the user to the login page.


## Cart Component

# Overview

    The Cart component allows users to view, update, and manage the items in their shopping cart. It displays each item with its details (name, description, price, quantity, subtotal), provides an option to remove items, and calculates the total price of the cart. Users can confirm their order, and the cart interface includes functionality for returning to the product listing or logging out.

# Key Features:

    Cart Item List: Displays products added to the cart, including quantity and subtotal.
    Update Quantity: Users can modify the quantity of items in the cart, which updates the subtotal and total price.
    Remove Item: Allows users to remove a product from the cart.
    Total Price Calculation: Displays the total price of all items in the cart.
    Order Confirmation: Users can confirm their order, which triggers a dialog displaying a confirmation message.
    Logout: Clears session and local storage, then redirects to the login page.
    Return to Product List: Users can navigate back to the product listing page.
