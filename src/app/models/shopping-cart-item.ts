import { Pizza } from './pizza';

export class ShoppingCartItem{
    pizza : Pizza;
    quantity : number;

    get totalPrice(){
        return this.pizza.price * this.quantity;
    }
}