import React from 'react'

const Header = ( { pageTitle, logoSrc } ) => {
  return (
    <header className='App-header'>
        <img src={logoSrc} className='App-logo' alt="logo" />
        <h1 className='App-title'>{pageTitle}</h1>
    </header>
  )
}

export default Header