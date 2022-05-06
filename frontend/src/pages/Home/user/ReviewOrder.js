import React, { Fragment, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Ratings from 'react-ratings-declarative';

import useApi from '../../../hooks/useApi';
import apiCrud from '../../../Helpers/apiCrud';
import useProducts from '../../../hooks/useProducts';

function ReviewOrder() {

  const params = useParams()

  const {data: order, status} = useApi(`/api/orders/${params.id}`, 'GET')

  const {data: products} = useProducts()


  // extract products form the order
  const purchasedProductsIds = products && status === 'success' && order.orderItems.map(p => p.product);
  // extract the purchased products form products
  const filterProducts = purchasedProductsIds && products.filter(p => purchasedProductsIds.includes(p._id));
  // extract the the products already reviewed by the user
  const productsReviewed = filterProducts && filterProducts.filter(p => p.reviews.some(r => r.user === order.user._id));


  // check if the target product already reviewed
  function isReviewed(item) {
    if(productsReviewed && productsReviewed.some(p => p._id === item.product)) {
      return true
    }else{
      return false
    }
  }

  // display already existed comment
  function existedComment(item) {
    return productsReviewed && productsReviewed.filter(p=>p._id===item.product).map(p=>p.reviews.filter(r=> r.user === order.user._id)).map(r=>r[0].comment)
  }

  // display already existed rating
  function existedRating(item) {
    const check = productsReviewed && productsReviewed.filter(p=>p._id===item.product).map(p=>p.reviews.filter(r=> r.user === order.user._id)).map(r=>r[0].rating)
    return check[0]
  }


  // hold review input
  const [review, setReview] = useState({
    id: '',
    rating: '',
    comment: ''
  })

  // handle comment change
  function handleChange(event, id) {
    const {name, value} = event.target
    setReview(prev => {
      return {
        ...prev,
        id: id,
        [name]: value
      }
    })
  }

  // handle rating change
  function changeRating( newRating, id ) {
    setReview(prev => ({
      ...prev,
      id: id,
      rating: newRating
    }))
  }

  // handle submition
  async function handleReviewSubmition(e, id) {
    e.preventDefault()
    apiCrud(`/api/products/${id}/reviews`, 'POST', 'Your feedback is invaluable', review)
  }

  return (
    
    <div className='user-review-id'>

    {order && 
      <div className='user-review-details'>
        <h2>Review</h2>
        
        <h5>#{order._id}</h5>

        <div className='user-review-details-items'>

          <table className='user-review-details-items-table'>

            <thead>
              <tr>
                <th>PHOTO</th>
                <th>NAME</th>
                <th>RATING</th>
              </tr>
            </thead>

            <tbody>

              {order.orderItems && order.orderItems.map(item => {
                return (
                  <Fragment key={item.product}>
                    <tr>

                      <td data-label="PHOTO">
                        <Link to={`/product/${item.product}`}>
                          <img src={item.image} alt='product'></img>
                        </Link>
                      </td>
                      
                      <td data-label="NAME">
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </td>

                      <td data-label="RATING">
                        {isReviewed(item) ? 
                        <Ratings
                          rating={existedRating(item)}
                          widgetDimensions="20px"
                          widgetSpacings="0px"
                          widgetRatedColors="gold"
                          widgetHoverColors="gold"
                        >
                          <Ratings.Widget />
                          <Ratings.Widget />
                          <Ratings.Widget />
                          <Ratings.Widget />
                          <Ratings.Widget />
                        </Ratings>
                        :
                        <Ratings
                          rating={review.rating ? review.id === item.product ? review.rating : 0 : 0}
                          changeRating={(x)=>changeRating(x, item.product)}
                          widgetDimensions="20px"
                          widgetSpacings="0px"
                          widgetRatedColors="gold"
                          widgetHoverColors="gold"
                        >
                          <Ratings.Widget />
                          <Ratings.Widget />
                          <Ratings.Widget />
                          <Ratings.Widget />
                          <Ratings.Widget />
                        </Ratings>
                        }
                      </td>
                    </tr>

                    <tr className='user-review-details-items-table-lastraw'>
                      <td colSpan= "2">
                        {isReviewed(item) ? 
                        <textarea
                          type='text'
                          name='comment'
                          disabled
                          value={existedComment(item)}
                        >
                        </textarea>
                        :
                        <textarea
                          type='text'
                          name='comment'
                          required
                          onChange={e => handleChange(e, item.product)}
                          value={review.id === item.product ? review.comment : ''}
                        >
                        </textarea>                        
                        }
                      </td>
                      <td>
                        {isReviewed(item) ?
                        <></>
                        :
                        <button onClick={e => handleReviewSubmition(e, item.product)}>
                          Submit Reivew
                        </button>
                        }
                      </td>
                    </tr>
                  </Fragment>
                )
              })}

            </tbody>

          </table>

        </div>

      </div>
    
    }
    </div>
  )
}

export default ReviewOrder