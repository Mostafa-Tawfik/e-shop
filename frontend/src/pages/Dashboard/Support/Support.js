import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Tickets from '../../../components/Tickets'


function Support(props) {

  // store tickets
  const [tickets , setTickets] = useState('')
  // console.log(tickets)

  // fetch all tickets
  useEffect(()=> {
    axios.get('/api/complaints/', {
      headers: {
        Authorization: `Bearer ${localStorage.jwt}`
      }
    })
    .then(data => setTickets(data.data))
  },[])

  return (
    <div className='support'>

      <h2>Tickets</h2>

      <Tickets tickets={tickets}/>
    </div>
  )
}

export default Support