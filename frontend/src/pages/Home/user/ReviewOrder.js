import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Ratings from 'react-ratings-declarative';

import popAlert from '../../../components/popAlert'

function ReviewOrder() {

  const params = useParams()
  const navigate = useNavigate()

  // store the order
  const [order, setOrder] = useState('')
  // console.log('order', order)

  // fetch the selected order
  useEffect(()=> {
    axios.get(`/api/orders/${params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
      }
    })
    .then(data => setOrder(data.data))
  },[])


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
    
    await axios({
      url: `/api/products/${id}/reviews`,
      method: 'POST',
      data: review,
      headers: {
          Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`,
        }
    })
    .then((res) => {
      popAlert('Thank you for your time', 'Your feedback is invaluable')
      console.log(res.data)
      navigate('/user/orders')
      return res.data
    })
    .catch(
      (error) => {
        if (error.response.status === 400) {
          popAlert('', 'Product already reviewed', 'warning')
        }
      console.log('err', error.response)
      }
    )
  }

  return (
    
    <div className='user-review-id'>

    {order && 
      <div className='user-review-details'>
        <h2>Review</h2>
        
        <h5>#{order._id}</h5>

        <div className='user-review-details-items'>

          <table className='user-review-details-items-table'>

            <tbody>

              <tr>
                <th>PHOTO</th>
                <th>NAME</th>
                <th>RATING</th>
              </tr>

              {order.orderItems && order.orderItems.map(item => {
                return (
                  <Fragment key={item.product}>
                    <tr>

                      <td>
                        <Link to={`/product/${item.product}`}>
                          <img src={item.image} alt='product'></img>
                        </Link>
                      </td>
                      
                      <td>
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </td>

                      <td>
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
                      </td>
                    </tr>

                    <tr className='user-review-details-items-table-lastraw'>
                      <td colSpan= "2">
                        <textarea
                          type='text'
                          name='comment'
                          required
                          onChange={e => handleChange(e, item.product)}
                          value={review.id === item.product ? review.comment : ''}
                        >
                        </textarea>
                      </td>
                      <td>
                        <button onClick={e => handleReviewSubmition(e, item.product)}>
                          Submit Reivew
                        </button>
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