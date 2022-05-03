import axios from 'axios'
import { useNavigate } from 'react-router'
import popAlert from './popAlert'

async function addProduct() {

  const navigate = useNavigate()

  await axios({
    url: '/api/products',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`
    },
  })
  .then((res) => {
    console.log(res.data)
    popAlert('Product added')
    setTimeout(()=> window.location.reload(), 1500) 
    return res.data
  })
  .catch(
    (error) => {
      console.log('error', error.response)
      popAlert('Somthing went wrong', 'error')
    }
  )
}

export default addProduct