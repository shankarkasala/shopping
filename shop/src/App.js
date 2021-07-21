
import './App.css';
import data from './data.json'

import React, { Component } from 'react'
import Products from './components/Products';
import Filter from './components/Filter';

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       products:data.products,
       size:"",
       sort:"",
    }
  }
  filterProducts =(e)=>{
    console.log(e.target.value)
    if(e.target.value===""){
      this.setState( {size :e.target.value, products: data.products})
    }else{
      this.setState({
        size:e.target.value,
        products: data.products.filter(
          product=>product.availableSizes.indexOf(e.target.value)>=0)
      })
    }
  }
  sortProducts=(e)=>{
console.log(e.target.value)
const sort= e.target.value;
this.setState((state)=>({
  sort: sort,
  products : this.state.products.slice().sort((a,b)=>(
    sort === "LOWEST"?
   ( (a.price > b.price) ? 1:-1):
   sort === "HIGHEST"?
   ((a.price < b.price)? 1:-1):
   ((a._id > b._id)? 1:-1)
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
             <Filter count={this.state.products.length}
               size={this.state.size}
               sort={this.state.sort}
               filterProducts={this.filterProducts}
               sortProducts={this.sortProducts}
             />
             <Products products={this.state.products}/>
           </div>
           <div className="sidebar">cart items</div>
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
