import axios from 'axios'
import { useMutation } from 'react-query'

import popAlert from '../Helpers/popAlert'

const login = async (userData) => {

  const res = await axios.post('api/users/login', userData)
  // console.log(res.data)
  return(res.data)
}

export default function useAuth() {
  return useMutation(login, {
    onSuccess: (data)=> {
      console.log(data);
      console.log('successfully logged in')
      localStorage.setItem('isAdmin', data.isAdmin)
      localStorage.setItem('userName', data.name)
      localStorage.setItem('userEmail', data.email)
      localStorage.setItem('jwt', data.token)
      popAlert(`Welcome back`)
      // if (data.isAdmin) {
      //   props.adminLogged()
      // }
      // navigate('/')
    }
  });
}