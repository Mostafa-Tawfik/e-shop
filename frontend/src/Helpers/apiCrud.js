import axios from 'axios'
import popAlert from './popAlert'

async function apiCrud(url, method, message) {

  await axios({
    url: url,
    method: method,
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`
    }
  })
  .then((res) => {
    console.log(res.data)
    message && popAlert(message)
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

export default apiCrud