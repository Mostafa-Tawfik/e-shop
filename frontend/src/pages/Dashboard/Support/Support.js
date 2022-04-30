import React from 'react'

import Tickets from '../../../components/Tickets'
import popAlert from '../../../Helpers/popAlert'
import useApi from '../../../hooks/useApi'
import { SpinnerDotted } from 'spinners-react'


function Support() {

  // fetch tickets
  const {status, data: tickets, error} = useApi('/api/complaints', 'GET')

  if(error) {
    popAlert('Somthing went wrong', 'error')
  }


  return (
    <div className='support'>

      <h2>Tickets</h2>

      {status === 'loading' && <SpinnerDotted />}
      {status === 'success' && <Tickets tickets={tickets}/>} 

    </div>
  )
}

export default Support