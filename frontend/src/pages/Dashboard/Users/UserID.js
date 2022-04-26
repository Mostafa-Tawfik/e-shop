import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

import OrdersList from '../../../components/OrdersList'
import Tickets from '../../../components/Tickets'
import Ratings from 'react-ratings-declarative'

function UserID(props) {

  const params = useParams()
  const {orders, tickets, products, isAdmin} = props


  // filter tickets made by the user
  const filterByTickets = tickets && tickets.filter(t => t.user._id === params.id)
  

  // filter orders made by the user
  const filterByOrders = orders && orders.filter(o => o.user._id === params.id)


  // filter products reviewed by the user
  const filterByReviews = products && products.filter(p => p.reviews.some(r => r.user === params.id))


  // filter user reviews
  const userReviews = products && products.map(p => p.reviews.filter(r => r.user === params.id)).map(r => r[0]).filter(r=> r !== undefined)


  // store user details
  const [user, setUser] = useState('')

  // fetch the user details
  useEffect(()=> {
    axios.get(`/api/users/${params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
      }
    })
    .then(data => setUser(data.data))
  },[params.id])


  const userContactSection = user && (
    <>
      <h2>{user.name}</h2>

      <section className='user-contact'>

        <img src={user.image ? user.image :'https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg'} alt='user'>      
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


  const userReviewsSection = products && (

    <section className='user-reviews'>

      <div className='orders-list-items'>

        <table className='orders-list-items-table'>

          <tbody>

            <tr>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>RATING</th>
              <th>COMMENT</th>
              <th>DATE</th>
            </tr>

            {filterByReviews.map((product, index) => {
              return (
                <tr key={product._id}>

                  {/* if admin go to admin order route */}
                  <td>
                    <img src={product.image} alt={product}></img>
                  </td>

                  <td>
                    <Link to={`/products/edit/${product._id}`}>
                      {product.name}
                    </Link>
                  </td>

                  <td>
                    <Ratings
                      rating={userReviews[index].rating*1}
                      widgetDimensions="20px"
                      widgetSpacings="0px"
                      widgetRatedColors="gold"
                    >
                      <Ratings.Widget />
                      <Ratings.Widget />
                      <Ratings.Widget />
                      <Ratings.Widget />
                      <Ratings.Widget />
                    </Ratings>
                  </td>

                  <td>{userReviews[index].comment}</td>

                  <td>{userReviews[index].createdAt.substr(0, 10)}</td>


                </tr>
              )
            })}

          </tbody>

        </table>    

      </div>

      </section>
  )


  return (
    <section className='user'>

     {userContactSection}   

      <h3>Previous Orders</h3>

      <div className='user-order-id'>

        {orders && 
          <OrdersList orders={filterByOrders} isAdmin={isAdmin}/>
        }
      </div>

      <h3>Previous Tickets</h3>
      <div className='support'>
        <Tickets tickets={filterByTickets}/>
      </div>

      <h3>Products Reviewed</h3>

      {userReviewsSection}

    </section>
  )
}

export default UserID