import { Link, useParams } from 'react-router-dom'
import React from 'react'

import OrdersList from '../../../components/OrdersList'
import Tickets from '../../../components/Tickets'
import Ratings from 'react-ratings-declarative'
import useApi from '../../../hooks/useApi'
import useProducts from '../../../hooks/useProducts'
import popAction from '../../../Helpers/popAction'

function UserID(props) {

  const params = useParams()

  // fetch tickets
  const {data: tickets} = useApi('/api/complaints', 'GET')
  const filterByTickets = tickets && tickets.slice(0).reverse().filter(t => t.user._id === params.id)


  // fetch orders
  const {status, data: orders} = useApi('/api/orders', 'GET')
  const filterByOrders = status === 'success' && orders.slice(0).reverse().filter(o => o.user._id === params.id)


  // fetch products
  const {data: products} = useProducts()

  const filterByReviews = products && products.filter(p => p.reviews.some(r => r.user === params.id))

  // filter user reviews
  const userReviews = products && products.map(p => p.reviews.filter(r => r.user === params.id)).map(r => r[0]).filter(r=> r !== undefined)


  // fetch orders
  const {data: user} = useApi(`/api/users/${params.id}`, 'GET')


  
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


  function moreDetails(rating, msg) {
    popAction(`Rating: ${rating}`, msg, 'Close!')
  }


  const userReviewsSection = products && (

    <section className='user-reviews'>

      <div className='orders-list-items'>

        <table className='orders-list-items-table'>

          <thead>
            <tr>
              <th className='smCell'>IMAGE</th>
              <th >NAME</th>
              <th className='smCell'>RATING</th>
              <th >COMMENT</th>
              <th className='smCell'>DATE</th>
            </tr>
          </thead>

          <tbody>

            {filterByReviews.map((product, index) => {
              return (
                <tr key={product._id} 
                onClick={()=>moreDetails(userReviews[index].rating, userReviews[index].comment)}
                style={{cursor: 'pointer'}}>

                  {/* if admin go to admin order route */}
                  <td data-label="IMAGE">
                    <img src={product.image} alt={product}></img>
                  </td>

                  <td data-label="NAME">
                    <Link to={`/products/edit/${product._id}`}>
                      {product.name}
                    </Link>
                  </td>

                  <td data-label="RATING">
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

                  <td data-label="COMMENT">{userReviews[index].comment}</td>

                  <td data-label="DATE">{userReviews[index].createdAt.substr(0, 10)}</td>


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
          <OrdersList orders={filterByOrders} isAdmin={props.isAdmin}/>
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