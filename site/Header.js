import React from 'react'

export const Header = ({ children }) => {
  return (
    <header>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {children}
      </div>
    </header>
  )
}