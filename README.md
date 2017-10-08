# Shopping cart client Angular 4

This is an angular client for the shoppingcart backend, it provides UI for the user, user authentication, cart and
product management (product creation and deletion is not available but product update is there for demonstration)

  - User authentication
  - RU on products
  - CRUD on carts

## Tech

The shopping cart uses the following technologies to work:

* Angular 4.2.4
* node
* npm
* the schoppingcart backend server

## Remarks
 * For the moment, the project uses only the test database set by the MongoRepository.
 * All the repositories are flushed on application start, this is done in the ShoppingcartApplication class, comment this:
 					cartUserRepository.deleteAll();
 					productRepository.deleteAll();
 					shoppingCartRepository.deleteAll();
 					at the lines 59 to 61.
 * Default users are set in the db on application start, uname: alice, psw: toto, uname: toto, psw: toto
 * Default products are also set in the db on application start.
 * There is no possibility to add a product (you can update them with a form) on the UI side but this backend provides an
 endpoint for this (could be used by an admin user for instance).

## Dependencies

* available in the package.json file

## Installation
* First make sure nvm and node are installed
* Go to [my springboot shopping cart repository](https://github.com/onizukaek/shoppingcart), install and run it
* Then
```
$ cd <project root>
$ npm install
$ ng serve
```

* open a web browser and go to http://localhost:4200

## Usage

###Home page
* First the user reaches the welcome page which has a button link to the login page
* Once the login button clicked, the login form is displayed, you can directly log in with an existing user
(uname: alice psw: toto, uname: toto psw: toto ... ) or click on the signup link and create a new one.

###User page
#####List mode
* The user is redirected to his home page which provides a product list
* On the page you will see a 'Shopping' button, this button enables the shopping mode and creates a new pending cart in the database
* The page header contains some links to the cart list and the home page

####Shopping mode
* Once the 'Shopping' button has been hit, a shopping cart appears in the UI and so does a new column with the buttons 
'Add' and 'Remove' in the product list.
* Click on 'Add' or 'Remove', this updates directly the shopping cart and the product stock in the backend
* You can go to the cart list, go back to the home page (click on 'Shopping' to enable mode), the shopping cart will
 be still available.
* Clicking on 'Cancel' removes the pending shopping cart from the database and updates the product stocks
* Clicking on 'Order' validates the order stores definitely the Shopping cart and the page goes back to the list mode

####Cart list
* Displays a list of cart related to the user by its username

####Logout
* Removes the token from the local storage

##Code

###Components
####welcome
The root component of the page

####signup
Handles the signup UI

####login
Handles the login process UI

####layout/header
Holds the navigation links

####home
Holds the two following components
#####home/product-detail
Displays the product details has two modes: view and edit
#####home/product-list
Displays the product list, has two modes: list and shop

####carts
Holds the two following components
#####carts/cart-list
Provides a cart list for the current user

###Providers
####alert
Handles the alert messages

####authentication
Provides access to the authentication endpoint

####cart
Provides access to the shopping cart endpoint

####endpoint
Stores all the endpoint entries

####product
Provides access to the product endpoint

###Models
####product
Product and its attributes

####user
User

####cart
Cart

###Pipes
####format to price
The prices are stored as cents in the database, this pipe converts them in francs

####object to array
Makes an object iterable in a "*ngFor" by converting it to an array of 2 items arrays
 
####product filter
filters an object from the text input
 
###Guards
####auth.guard
Allows access to logged in users to the cart list and home section





