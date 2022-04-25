import React from 'react'
import { Link } from 'react-router-dom'
import resolveTicket from './resloveTicket'

function Tickets(props) {

  // store orders
  const {tickets} = props  

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

          <tbody>

            <tr>
              <th>Ticket ID</th>
              <th>NAME</th>
              <th>MESSAGE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>

            {tickets[0] && tickets.map(ticket => {
              return (
                <tr key={ticket._id}>

                  <td>
                    <Link to={`/dashboard/complaints/${ticket._id}`}>#{ticket._id}</Link>
                  </td>

                  <td>{ticket.user.name}</td>

                  <td>{ticket.complaintMessage.substr(0, 40)}</td>

                  <td>
                    {ticket.resolved ? <p style={{color: 'green', fontWeight: 'bolder'}}>Resolved</p> : 'Opened'}
                  </td>
                  
                  <td>{!ticket.resolved && resolve(ticket._id)}</td>

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