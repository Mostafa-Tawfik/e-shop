import React from 'react'

import HomeSection from '../../../components/HomeSection'


function Homepage(props) {

  const [products, setProducts] = React.useState([])

  const categories = [...new Set(products.map(p => p.category))]

  React.useEffect(()=> {
    fetch('/api/products')
    .then(res => res.json())
    .then(data => setProducts(data.products))
  },[])

  return (
    <div>
      <img src='../images/Free-Advertising-Ideas.jpg' alt='ad' className='ad-image'></img>

      {categories.map((c,i) => (
        <div key={i}>
          <HomeSection {...props} filter={c}/>
        </div>
      ))}
      
    </div>
  )
}

export default Homepage