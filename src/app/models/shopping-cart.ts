import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart{
    items : ShoppingCartItem[];

    getTotalItemCount(){
        let count = 0;
        for(let pizzaId in this.items){
        count +=  this.items[pizzaId].quantity;
        }
      return count;  
    }
}