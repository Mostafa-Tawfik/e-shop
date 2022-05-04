import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// important ***
// mush pass array of li named 'content'

function SideMenu(props) {

  const {content} = props

  // control side menu
  const [isActive, setIsActive] = useState({
    menuActive: false,
  })

  // toggle menu
  function toggleMenu() {
    setIsActive(prev => {
      return {
        ...prev,
        menuActive: !isActive.menuActive
      }
    })
  }

  // hide menu toggler on homepage for medium screens
  function checkAdmin() {
    if(localStorage.isAdmin === 'false') {
      return `menuToggler user`
    } else if (localStorage.isAdmin === 'true') {
      return 'menuToggler'
    } else return `menuToggler user`
  }


  return (
    <>
      <div className={checkAdmin()}>
        <button className={
          isActive.menuActive ? 
          `toggle active` : 
          `toggle`} 
          onClick={toggleMenu}
        >
        </button>
      </div>

      <div className={
        isActive.menuActive ? 
        `side-menu active` : 
        `side-menu`} 
      >

      <ul>
        <li>
          <Link to={`/`}>    
            <p className="side-menu-li" onClick={toggleMenu}>
              Home
            </p>
          </Link>            
        </li>

        {content.map((c, index) => (
          <li key={index}>
            <Link to={`/${c}`}>    
              <p className="side-menu-li" onClick={toggleMenu}>
                {c}
              </p>
            </Link>
          </li>
        ))}
        </ul>
      </div>
    </>
  )
}

export default SideMenu