import axios from 'axios'
import popAlert from './popAlert'

async function deleteOrder(id) {

  await axios(`/api/orders/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`
    }
  })
  .then((res) => {
    console.log(res.data)
    popAlert('Order deleted')
    setTimeout(()=> window.location.reload(), 2000) 
    return res.data
  },
  (error) => {
    console.log(error)
  }
  )

}

export default deleteOrder