import React from 'react'
import { randomBits } from './helpers/unique'

export const Cart = ({ items, removeFromCart }) => {
  return (
    <>
      {items.map(item =>
        <div key={randomBits()} style={{ display: 'flex', justifyContent: 'space-between', margin: '0 2rem', padding: '2rem 0', borderBottom: 'solid 1px black' }}>
          <div>
            <div style={{ fontSize: '1.5em' }}>{item.product}</div>
            <div>Price: {item.price} {item.currency}</div>
            <div>Qty: <span>{item.qty}</span></div>
          </div>
          <button onClick={() => removeFromCart(item.productId)} style={{ backgroundColor: 'red' }}>Remove 1 From Cart</button>
        </div>
      )}
      <div style={{ marginTop: '1rem', paddingTop: '1rem' }}>
        <h3 style={{marginLeft: '2rem'}}>
        {
          items.length === 0 ?
          `There are no items in the cart` :
          `Total: ${RegExp(/[0-9]*\.[0-9]{0,2}/).exec(items.reduce((total, item) => total + (item.price * item.qty), 0).toString()) || '0.00'}`
        }
        </h3>
      </div>
    </>
  )
}

