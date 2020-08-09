import React from 'react'

export const Header = ({ children }) => {
  return (
    <header style={{ backgroundColor: 'teal' }}>
      <div style={{ margin: 'auto', width: '70%', display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
        {children}
      </div>
    </header>
  )
}