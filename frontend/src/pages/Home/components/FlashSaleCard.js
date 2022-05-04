import React from 'react'
import { Link } from 'react-router-dom'
import Ratings from 'react-ratings-declarative'

import Countdown from '../../../components/Countdown'

function FlashSaleCard(props) {

  const {content} = props

  return (
    content &&
    <Link to={`/product/${content._id}`}>
      <div className="flash-card">
        <div className="flash-card-header">
          <img src='https://res.cloudinary.com/hpzeojxtz/image/upload/v1651626629/ltjliggxwyspzxztogvx.jpg' alt='banner'></img>
        </div>
        <div className="flash-card-main">
          <img src={content.image} alt='product'></img>
          <div className="flash-card-main-info">
            <div className="flash-card-main-info-cat">
              <p>{content.category}</p>
              <p>{content.subCategory}</p>
            </div>
            <Ratings
                rating={content.rating}
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
            <p>{content.name}</p>
            <div className='flash-card-main-info-price'>
              <h5 className='flash-card-main-info-newprice'>
                ${Number(content.price*(100 - content.discount)/100).toFixed(2)}
              </h5>
              <h5 className='flash-card-main-info-oldprice'>
                ${Number(content.price).toFixed(2)}
              </h5>
            </div>
            
            <Countdown />

          </div>
        </div>
      </div>    
    </Link>
  )
}

export default FlashSaleCard