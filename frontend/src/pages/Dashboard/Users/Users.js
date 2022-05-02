import React from 'react'
import { Link } from 'react-router-dom'

import popAlert from '../../../Helpers/popAlert'
import useApi from '../../../hooks/useApi'
import { SpinnerDotted } from 'spinners-react'

function Users() {

  // fetch users
  const {status, data: users, error} = useApi('/api/users', 'GET')

  if(error) {
    popAlert('Somthing went wrong', 'error')
  }


  return (
    <div className='dash-orders'>

      <h2>Users</h2>

      <div className='orders-list-items'>

        {status === 'loading' && <SpinnerDotted />}
        
        <table className='orders-list-items-table'>

          <tbody>

            <tr>
              <th>ID</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>Phone Number</th>
              <th>ROLE</th>
            </tr>

            {status === 'success' && users.map(user => {
              return (
                <tr key={user._id}>

                  {/* if admin go to admin user route */}
                  <td><Link to={`/users/${user._id}`}>#{user._id}</Link></td>

                  <td><img src={user.image} alt='user'></img></td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.phoneNumber}</td>

                  <td>{user.isAdmin ? 'Admin' : 'User'}</td>

                </tr>
              )
            })}

          </tbody>

        </table>    

      </div>

    </div>
  )
}

export default Users