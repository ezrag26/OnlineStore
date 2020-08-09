import React from "react";
import { randomBits } from "./helpers/unique";

export const Products = ({ items, addToCart }) => {
  return (
    <>
      {items.map(item =>
        <div key={randomBits()} style={{ display: 'flex', justifyContent: 'space-between', margin: '0 2rem', padding: '2rem 0', borderBottom: 'solid 1px black' }}>
          <div>
            <div style={{ fontSize: '1.5em' }}>{item.product}</div>
            <div>Price: {item.price} {item.currency}</div>
            <div>There are <span>{item.qty}</span> left in stock</div>
          </div>
          <button onClick={() => addToCart(item.productId)} style={{ backgroundColor: 'green' }}>Add To Cart</button>
        </div>
      )}
    </>
  )
}