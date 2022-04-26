import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import ProductCard from '../../../components/ProductCard'

function Category() {

  const params = useParams()

  // store all products
  const [products, setProducts] = React.useState([])
  
  // fetch all products
  useEffect(()=> {
    axios.get('/api/products?productNum=Infinity')
    .then(res => setProducts(res.data.products))
  },[])

  const filterByCategory = products.filter(p=> p.category === params.name)
  console.log(filterByCategory);
  
  return (

    <main className='category'>

      <aside>

      </aside>

      <section>

        <div className='product-holder'>
          {filterByCategory.map(product => (
            <ProductCard content={product} key={product._id}/>
          ))}
        </div>
      </section>
      
    </main>

  )
}

export default Category