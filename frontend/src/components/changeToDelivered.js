import axios from 'axios'
import popAlert from './popAlert'

async function changeToDelivered(id) {

  await axios(`/api/orders/${id}/deliver`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
    }
  })
  .then((res) => {
    console.log(res.data)
    popAlert('Status changed')
    setTimeout(()=> window.location.reload(), 2000) 
    return res.data
  },
  (error) => {
    console.log(error)
  }
  )

}

export default changeToDelivered