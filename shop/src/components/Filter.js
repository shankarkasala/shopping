import React, { Component } from 'react'

export class Filter extends Component {
    render() {
        return (
            <div className="filter">
            <div className="filter-result">
             {this.props.count} {" "}Products
            </div>
            <div className="filter-sort">
                order {" "} <select value={this.props.sort} 
                onChange={this.props.sortProducts}>
                <option >latest</option>
                <option value="LOWEST">LOWEST</option>
                <option value="HIGHEST">HIGHEST</option>
            
                </select>
            </div>
            <div className="filter-size">
                filter {" "} 
                <select value={this.props.size} 
                onChange={this.props.filterProducts}>
                <option value="">ALL</option>
                    <option value="XS">XS</option> 
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option> 
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
        
                </select>
            </div>
            </div>
        )
    }
}

export default Filter
