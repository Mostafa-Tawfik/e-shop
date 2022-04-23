import axios from 'axios'
import popAlert from './popAlert'

async function changeToPaid(id) {

  await axios(`/api/orders/${id}/pay`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
    }
  })
  .then((res) => {
    console.log(res.data)
    popAlert('Status changed successfully', 'Paid!')
    setTimeout(()=> window.location.reload(), 2000) 
    return res.data
  },
  (error) => {
    console.log(error)
  }
  )

}

export default changeToPaid