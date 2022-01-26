
import './App.css';
import data from './data.json'

import React, { Component } from 'react'
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: data.products,
      cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
      size: "",
      sort: "",
      //selectsize:localStorage.getItem("selectsize")?JSON.parse(localStorage.getItem("selectsize")):[],

    }
    console.log(this.state.products)
  }
  
  //  setSelectedProduct=(product)=>{
  //    this.setState({selectedProduct:product})
  //  }
  // selected size
  selectedsize = (e, product) => {
    const selectsize = e.target.value
    product.selectsize = `${product.selectsize} ${selectsize}`
    //  this.setSelectedProduct(product)
    this.setProductsData(product)

    // localStorage.setItem("selectsize",JSON.stringify(selectsize))
  }
  setProductsData = (product) => {
    const products = this.state.products
    const index = products.findIndex(x => x._id === product._id)
    products[index] = product
    this.setState({ products })
  }

  // create order

  createOrder = (order) => {
    alert("hello" + order.name)

  }

  // add to cart

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    
    let alreadyInCart = false
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++
        alreadyInCart = true
        item.selectsize = product.selectsize
      }
    })
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 })
    }
    this.setState({ cartItems })
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }

  // remove from cart

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice()
    product.selectsize = ""
    this.setProductsData(product)
    // const index = cartItems.findIndex((x)=>x._id === product._id)
    // cartItems[index].selectsize=""
    // this.setState({cartItems: cartItems.filter((x)=>x._id === product._id)})
    this.setState({ cartItems: cartItems.filter((x) => x._id !== product._id) })
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x) => x._id !== product._id)))
  }

  // filter products

  filterProducts = (e) => {
    console.log(e.target.value)
    if (e.target.value === "") {
      this.setState({ size: e.target.value, products: data.products })
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          product => product.availableSizes.indexOf(e.target.value) >= 0)
      })
    }
  }

  //sort products

  sortProducts = (e) => {
    console.log(e.target.value)
    const sort = e.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => (
        sort === "LOWEST" ?
          ((a.price > b.price) ? 1 : -1) :
          sort === "HIGHEST" ?
            ((a.price < b.price) ? 1 : -1) :
            ((a._id > b._id) ? 1 : -1)
      ))
    }));
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
                selectedsize={this.selectedsize}


              />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}

              />

            </div>
          </div>
        </main>
        <footer>
          All rights is reserved
        </footer>
      </div>
    );
  }
}

export default App;
