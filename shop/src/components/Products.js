import React, { Component } from 'react'
import formatCurrency from '../util'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'
export class Products extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: null,

        }
    }
    openModal = (product) => {
      
        this.setState({ product })
    }
    closeModal = () => {
        this.setState({ product: null })
    }
    selectedsize=(e,product)=>{
        this.props.selectedsize(e,product)
    }
    render() {
        const { product} = this.state

        return (
            <div>
                <Fade bottom cascade={true}>
                    <ul className="products">
                        {this.props.products.map(product => (
                            <li key={product._id}>
                                <div className="product">
                                    <a href={"#" + product._id}
                                        onClick={() => this.openModal(product)}
                                    >
                                        <img src={product.image} alt={product.title}/>
                                        <p>
                                            {product.title}


                                        </p>
                                    </a>
                                    <div className="product-price">
                                        <div>
                                            {formatCurrency(product.price)}
                                        </div>


                                        <button onClick={() => this.openModal(product)} className="button button-primary">Add Cart</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Fade>
                {
                    product && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            < Zoom>
                                <div>modal</div>
                                <button className="close-modal" onClick={this.closeModal}>X</button>
                                <div className="product-details">
                                    <img src={product.image} alt={product.title}></img>
                                    <div className="product-details-description">
                                        <p>
                                            <strong>{product.title}</strong>
                                        </p>
                                        <p>
                                            {product.description}
                                        </p>
                                        <p>
                                            <select onChange={(e)=>this.selectedsize(e,product)} >{product.availableSizes.map(x => (

                                                <option key={product._id} value={x}>{x}</option>
                                            ))}</select>
                                            {/* Avilable sizes : {" "}
                                        {product.availableSizes.map(x=>(
                                            <span>{""}<select ><option value={x}>{x}</option></select>
                                            <button onClick={()=>this.selectedsize(x)} className="button button-primary">{x}</button></span>
                                        ))} */}
                                        </p>
                                        <div className="product-price">
                                            <div>
                                                {formatCurrency(product.price)}
                                                <button className="button button-primary" onClick={() => {
                                                    this.props.addToCart(product)

                                                    this.closeModal()
                                                }}>Add To Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>

                        </Modal>
                    )
                }
            </div>
        )
    }
}

export default Products
