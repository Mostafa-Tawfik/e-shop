import axios from 'axios'
import popAlert from '../Helpers/popAlert'

async function changeToDelivered(id) {

  await axios(`/api/orders/${id}/deliver`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`
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