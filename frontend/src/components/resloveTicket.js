import axios from 'axios'
import popAlert from './popAlert'

async function resolveTicket(id) {

  await axios(`/api/complaints/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
    }
  })
  .then((res) => {
    console.log(res.data)
    popAlert('', 'Resolved')
    setTimeout(()=> window.location.reload(), 2000) 
    return res.data
  },
  (error) => {
    console.log(error)
  }
  )

}

export default resolveTicket