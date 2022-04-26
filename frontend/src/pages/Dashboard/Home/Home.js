import React from 'react'

import hero from '../Dashboard.png'

function Home() {

  return (
    <div className='dashboard-section'>
      <h2>Dashboard</h2>

      <div className='dashboard-section-hero'>
        <img src={hero} alt='logo'></img>
      </div>


    </div>
  )
}

export default Home