import React from 'react'
import { randomBits } from './helpers/unique'

export const Cart = ({ items, removeFromCart }) => {
  return (
    <>
      {items.map(item =>
        <div key={randomBits()} style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 30px' }}>
          <div>
            <div style={{ fontSize: '1.5em' }}>{item.product}</div>
            <div>Price: {item.price}{item.currency}</div>
            <div>Qty: <span>{item.qty}</span></div>
          </div>
          <button onClick={() => removeFromCart(item.productId)} style={{ backgroundColor: 'red' }}>Remove 1 From Cart</button>
        </div>
      )}
    </>
  )
}

