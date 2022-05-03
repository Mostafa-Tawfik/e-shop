import React from 'react'

import apiCrud from '../Helpers/apiCrud'
import popAction from '../Helpers/popAction'

function Tickets(props) {

  // store orders
  const {tickets} = props  

  function moreDetails(id, msg, isResolved) {
    isResolved ?
    popAction('Message', msg, 'Close!')
    :
    popAction('Message', msg, 'Resolve', 
      ()=>apiCrud(`/api/complaints/${id}`, 'PUT', 'Resolved')()
    )
  }


  return (
    <>
      <div className='support-items'>

        <table className='support-items-table'>

          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>NAME</th>
              <th>MESSAGE</th>
              <th>STATUS</th>
            </tr>         
          </thead>

          <tbody>

            {tickets && tickets.slice(0).reverse().map(ticket => {
              return (
                <tr key={ticket._id} 
                style={{cursor: 'pointer'}} 
                onClick={()=>moreDetails(ticket._id, ticket.complaintMessage, ticket.resolved)}>

                  <td data-label="Ticket ID">
                   #{ticket._id}
                  </td>

                  <td data-label="NAME">{ticket.user.name}</td>

                  <td data-label="MESSAGE">{ticket.complaintMessage.substr(0, 40)}</td>

                  <td data-label="STATUS">
                    {ticket.resolved ? <p style={{color: 'green', fontWeight: 'bolder'}}>Resolved</p> : 'Opened'}
                  </td>
                  
                </tr>
              )
            })}

          </tbody>

        </table>    

      </div>

    </>
  )
}

export default Tickets