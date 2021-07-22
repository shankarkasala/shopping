import React, { Component } from 'react'
import formatCurrency from '../util'

export class Cart extends Component {
    render() {
        const {cartItems} = this.props
        return (
            <div>
               {cartItems.length===0 ? <div className="cart cart-header">cart is empty</div>
               :
               <div className="cart cart-headr">you have {cartItems.length} in the cart {" "}</div>
               } 
               <div className="cart">
                   <ul className="cart-items">
                       {cartItems.map(item=>(
                           <li key={item._id}>
                               <div>
                                   <img src={item.image} alt={item.title}></img>
                               </div>
                               <div>{item.title}</div>
                               <div className="right">
                                   {formatCurrency(item.price)} x {item.count} {" "}
                               <button className="button button-primary" onClick={()=>this.props.removeFromCart(item)}>
                                   Remove
                               </button>
                               </div>
                              
                           </li>
                       ))}
                   </ul>
               </div>
               {cartItems.length!==0 &&(
 <div className="cart">
 <div className="total">
     Total : {" "}
     {formatCurrency( cartItems.reduce((a,c)=> a+(c.price*c.count),0))}
 </div>
 <button className="button button-primary">Proceed</button>
</div>
               )}
              
            </div>
        )
    }
}

export default Cart
