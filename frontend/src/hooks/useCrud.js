import axios from 'axios'
import { useMutation } from 'react-query'

import popAlert from '../Helpers/popAlert'

const crud = async (url, method) => {

  const res = await axios({
    url: url,
    method: method,
    headers: {
      Authorization: `Bearer ${localStorage.jwt}`
    }
  })
  console.log(res.data)
  // .catch(
  //   (error) => {
  //     console.log('error', error.response)
  //     popAlert('Somthing went wrong', 'error')
  //   }
  // )
}

export default function useCrud() {
  return useMutation(crud);
}