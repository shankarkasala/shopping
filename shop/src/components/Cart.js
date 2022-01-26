import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from  'react-reveal/Fade'

export class Cart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name:"",
            email:"",
            address:"",
            showCheckout:false
        }
    }
   
    handelInput=(e)=>{
        this.setState({[e.target.name]: e.target.value})
        console.log(e.target.value)
    }
    createOrder=(e)=>{
        e.preventDefault()
        const order = {
            name : this.state.name,
            email : this.state.email,
            address : this.state.address,
            cartItems: this.props.cartItems
            
        }
        this.props.createOrder(order)
        console.log(order.name)
        
    }
    render() {

        const {cartItems} = this.props
        return (
            <div>
               {cartItems.length===0 ? <div className="cart cart-header">cart is empty</div>
               :
               <div className="cart cart-headr">you have {cartItems.length} item in the cart {" "}</div>
               } 
               <div className="cart">
                   <Fade left cascade>
                   <ul className="cart-items">
                       {cartItems.map(item=>(
                           <li key={item._id}>
                               <div>
                                   <img src={item.image} alt={item.title}></img>
                               </div>
                               <div>{item.title}</div>
                              {item ? <div>size : {item.selectsize}</div>:null}
                              {/* <div>size : {selectsize}</div> */}
                               <div className="right">
                                   {formatCurrency(item.price)} x {item.count} {" "}
                               <button className="button button-primary" onClick={()=>this.props.removeFromCart(item)}>
                                   Remove
                               </button>
                               </div>
                              
                           </li>
                       ))}

                   </ul>
                   </Fade>
               </div>
               {cartItems.length!==0 &&(
                   <div>
                 <div className="cart">
                      <div className="total">
                          Total : {" "}
                                {formatCurrency( cartItems.reduce((a,c)=> a+(c.price*c.count),0))}
                              </div>
                           <button className="button button-primary" onClick={()=>{this.setState({showCheckout : true})}}>Proceed</button>
                           </div>
                           <div>
                               {this.state.showCheckout &&(
                                   <div className="cart">
                                       <form onSubmit={this.createOrder}>
                                           <div>
                                               <Fade right cascade>
                                           <ul className="form-container">
                                           <li>
                                               <label>Email</label>
                                               <input name="email"type="email" required onChange={this.handelInput}></input>
                                           </li>
                                           <li>
                                               <label>Name</label>
                                               <input name="name" type="text" required onChange={this.handelInput}></input>
                                           </li>
                                           <li>
                                               <label>Address</label>
                                               <input name="address" type="text" required onChange={this.handelInput}></input>
                                           </li>
                                           <li>
                                           <button className="button button-primary" type="submit"  >Checkout</button>
                                           </li>
                                       </ul>
                                       </Fade>
                                    
                                           </div>
                                       </form >
                                      

                                       </div>
                               )}
                          
                      </div>
                    </div>  
              )}
              
            </div>
        )
    }
}

export default Cart
