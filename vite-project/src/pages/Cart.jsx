import React from "react";
import { useStore } from "../context/StoreContext";

export default function Cart() {
  const { cart, changeQty, removeFromCart, clearCart, cartTotal } = useStore();

  if (!cart || cart.length === 0) 
    return (
      <div className="cart-page">
        <div className="cart-container">
          <p>Your cart is empty.</p>
        </div>
      </div>
    );

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2>Your Cart</h2>
        <ul className="cart-list">
          {cart.map((it) => (
            <li key={it.book.key} className="cart-item">
              <div className="cart-details">
                <strong>{it.book.title}</strong>
                <div>Price: ${it.book.price}</div>
              </div>
              <div className="cart-controls">
                <button onClick={() => changeQty(it.book.key, it.qty - 1)}>-</button>
                <div>{it.qty}</div>
                <button onClick={() => changeQty(it.book.key, it.qty + 1)}>+</button>
                <button onClick={() => removeFromCart(it.book.key)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>

        <h3>Total: ${cartTotal.toFixed(2)}</h3>

        <div className="cart-actions">
          <button onClick={() => { alert("Checkout simulated — clearing cart"); clearCart(); }} className="btn">
            Checkout
          </button>
          <button onClick={clearCart} className="btn btn-clear">
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}
