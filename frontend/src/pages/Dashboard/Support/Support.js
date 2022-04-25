import React from 'react'

import Tickets from '../../../components/Tickets'


function Support(props) {

  const {tickets} = props 

  return (
    <div className='support'>

      <h2>Tickets</h2>

      <Tickets tickets={tickets}/>
    </div>
  )
}

export default Support