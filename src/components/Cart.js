import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'


export default class Cart extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '', email: '', address: '',
            showCheckout: false
        }
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems
        }
        this.props.createOrder(order)
    }

    render() {
        const { cartItems } = this.props;
        return (

            <div>
                {cartItems.length === 0 ?
                    (<div className="cart cart-header">Cart is empty</div>)
                    :
                    (<div className="cart cart-header">You have {cartItems.length} item(s) in the cart</div>)
                }

                <div className="cart">
                    <Fade left cascade={true}>
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                    </div>
                                    <div className="right">
                                        &#36; {item.price} x {item.count} {" "}
                                        <button className="button" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                                    </div>
                                </li>

                            ))}
                        </ul>
                    </Fade>
                </div>
                {cartItems.length !== 0 && (
                    <div className="cart">
                        <div className="total">
                            <div>
                                Total:{" "}
                                &#36; {cartItems.reduce((a, c) => a + c.price * c.count, 0)}
                            </div>
                            <div>
                                <button onClick={() => this.setState({ showCheckout: true })} className="button primary">Proceed</button>
                            </div>
                        </div>
                        {
                            this.state.showCheckout && (
                                <Fade right cascade={true}>
                                <div className="cart">
                                    <form onSubmit={this.createOrder}>
                                        <ul className="form-container">
                                            <li>
                                                <label>Email </label>
                                                <input name="email" type="email" required onChange={this.handleInput} />
                                            </li>
                                            <li>
                                                <label>Name </label>
                                                <input name="name" type="text" required onChange={this.handleInput} />
                                            </li>
                                            <li>
                                                <label>Address </label>
                                                <input name="address" type="address" required onChange={this.handleInput} />
                                            </li>
                                            <li>
                                                <button type="submit" className="button primary">Checkout</button>
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                                </Fade>
                            )
                        }
                    </div>

                )}

            </div>


        )
    }
}
