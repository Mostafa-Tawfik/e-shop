import React from 'react'
import { Link } from 'react-router-dom'
import apiCrud from '../Helpers/apiCrud'

function Tickets(props) {

  // store orders
  const {tickets} = props  

  // resolve ticket
  function resolveTicket(id) {
    apiCrud(`/api/complaints/${id}`, 'PUT', 'Resolved')
  }

  // handle actions btn
  function resolve(id) {
    return (
      <button 
      onClick={()=>resolveTicket(id)}
      className='resolve-btn'
      >
        Resolve
      </button>
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
              <th>ACTIONS</th>
            </tr>         
          </thead>

          <tbody>

            {tickets && tickets.slice(0).reverse().map(ticket => {
              return (
                <tr key={ticket._id}>

                  <td data-label="Ticket ID">
                    <Link to={`/complaints/${ticket._id}`}>#{ticket._id}</Link>
                  </td>

                  <td data-label="NAME">{ticket.user.name}</td>

                  <td data-label="MESSAGE">{ticket.complaintMessage.substr(0, 40)}</td>

                  <td data-label="STATUS">
                    {ticket.resolved ? <p style={{color: 'green', fontWeight: 'bolder'}}>Resolved</p> : 'Opened'}
                  </td>
                  
                  <td data-label="ACTIONS">{!ticket.resolved && resolve(ticket._id)}</td>

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