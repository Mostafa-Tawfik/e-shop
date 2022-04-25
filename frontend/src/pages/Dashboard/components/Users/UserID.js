import axios from 'axios'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import OrdersList from '../../../../components/OrdersList'

function UserID(props) {

  const params = useParams()
  const {orders, tickets, isAdmin} = props

  const filterUserOrders = orders && orders.filter(o => o.user._id === params.id)

  const userOrders = [...filterUserOrders]

  // store users
  const [user, setUser] = useState('')
  console.log(user)

  // fetch all users
  useEffect(()=> {
    axios.get(`/api/users/${params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
      }
    })
    .then(data => setUser(data.data))
  },[])


  const userSection = user && (
    <>
      <h2>{user.name}</h2>

      <section className='user-contact'>

        <img src='https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg' alt='user'>      
        </img>

        <article>

          <div>
            <h5>Phone Number</h5>
            <p>{user.phoneNumber}</p>
          </div>

          <div>
            <h5>Email</h5>
            <p>{user.email}</p>
          </div>

          <div>
            <h5>Address</h5>
            <p>{user.address}</p>
          </div>

          <div>
            <h5>Joined</h5>
            <p>{user.createdAt.substr(0, 10)}</p>
          </div>

        </article>

      </section>
    </>
  )


  return (
    <section className='user'>

     {userSection}   

      <div className='dash-order-id'>

        <h3>Previous Orders</h3>
        {orders && 
          <OrdersList orders={userOrders} isAdmin={isAdmin}/>
        }
      </div>

    </section>
  )
}

export default UserID