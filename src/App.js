import React from 'react';
import './App.css';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Product from './components/Product';
import data from './data.json'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      products: data.products,
      size: '',
      sort: '',
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    }
  }

  createOrder=(order)=>
  {
    alert(`${order.name}`)
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    console.log(cartItems)
    this.setState({
      cartItems: cartItems.filter(x => x._id !== product._id)
    });
    localStorage.setItem("cartItems", JSON.stringify( cartItems.filter(x => x._id !== product._id)))

  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true
      }
    });
    if (!alreadyInCart) {
      cartItems.push({
        ...product, count: 1
      });
    }
    this.setState({
      cartItems
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  }

  filterProducts = (e) => {
    if (e.target.value === "") {

      this.setState({
        size: e.target.value,
        products: data.products
      })
    }
    else {
      this.setState({
        ...this.state,
        size: e.target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(e.target.value) > -1)
      }, () => {
        console.log(this.state.products)
      })

    }
  }

  sortProducts = (e) => {

    const sort = e.target.value;
    console.log(e.target.value)
    this.setState({
      ...this.state,
      sort,
      products: this.state.products
        .slice()
        .sort((a, b) => (
          sort === "lowest" ?
            ((a.price - b.price)) :

            sort === "highest" ?
              ((b.price - a.price)) :
              ((a._id < b._id ? 1 : -1))
        ))
    })
    console.log(this.state.products)
  }

  render() {
    return (

      <div className="grid-container">
        <header>
          <a href="/">Shopping cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
                size={this.state.size} sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Product products={this.state.products} addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} createOrder={this.createOrder} removeFromCart={this.removeFromCart} />
            </div>
          </div>
        </main>
        <footer>
          All rights is reserved..
        </footer>
      </div>

    );
  }
}

export default App;
