import { Injectable } from '@angular/core';

@Injectable()
export class EndpointsProvider {
  API_PATH: string = "http://localhost:8080";

  getLogin(){
    return this.API_PATH + "/login";
  }

  getSignup(){
    return this.API_PATH + "/users/signup";
  }

  getProducts(){
    return this.API_PATH + "/products";
  }

  getProduct(productId: string){
    return this.API_PATH + "/products/" + productId;
  }

  getCarts(){
    return this.API_PATH + "/carts";
  }

  getCartsByUserName(userName: string){
    return this.API_PATH + "/carts/user/" + userName;
  }
}
