import React from 'react'
import { Link } from 'react-router-dom'

function Users(props) {

  // store users
  const users = props.users


  return (
    <div className='dash-orders'>

      <h2>Users</h2>

      <div className='orders-list-items'>

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

            {users[0] && users.map(user => {
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