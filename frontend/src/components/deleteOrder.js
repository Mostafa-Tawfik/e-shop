import axios from 'axios'
import popAlert from './popAlert'

async function deleteOrder(id) {

  await axios(`/api/orders/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
    }
  })
  .then((res) => {
    console.log(res.data)
    popAlert('Done!', 'Order deleted')
    setTimeout(()=> window.location.reload(), 2000) 
    return res.data
  },
  (error) => {
    console.log(error)
  }
  )

}

export default deleteOrder