import axios from 'axios'
import { useNavigate } from 'react-router'
import popAlert from '../Helpers/popAlert'

 function useCreateProduct() {

  const navigate = useNavigate()

  const addProduct = async ()=> {

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
      setTimeout(()=> navigate(`/products/edit/${res.data._id}`), 1500) 
      return res.data
    })
    .catch(
      (error) => {
        console.log('error', error.response)
        popAlert('Somthing went wrong', 'error')
      }
    )
  }

  return ()=>addProduct()

}

export default useCreateProduct