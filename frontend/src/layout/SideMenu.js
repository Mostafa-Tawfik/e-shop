import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// important ***
// mush pass array of li named 'content'

function SideMenu(props) {

  const {content} = props

  // control side menu
  const [isMenuActive, setIsMenuActive] = useState(false)

  // toggle menu
  function toggleMenu() {
    setIsMenuActive(prev => !prev)
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
          isMenuActive ? 
          `toggle active` : 
          `toggle`} 
          onClick={toggleMenu}
          onBlur={()=>setIsMenuActive(false)}
        >
        </button>
      </div>

      <div className={
        isMenuActive ? 
        `side-menu active` : 
        `side-menu`} 
      >

      <ul>
        <li>
          <Link to={`/`}>    
            <p className="side-menu-li" onClick={()=>setIsMenuActive(false)}>
              Home
            </p>
          </Link>            
        </li>

        {content.map((c, index) => (
          <li key={index}>
            <Link to={`/${c}`}>    
              <p className="side-menu-li" onClick={()=>setIsMenuActive(false)}>
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