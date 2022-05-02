import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useQuery} from 'react-query'

import popAlert from '../Helpers/popAlert';
import useAuth from '../hooks/useAuth';

export default function Login(props) {

  const navigate = useNavigate()

  // Error Message State
  const [errorMessages, setErrorMessages] = React.useState('');

  // used for storing user input
  const [loginUser, setLoginUser] = React.useState({
    email: '',
    password: ''
  });


  // handle input change
  function handleChange(event) {
    const {name, value} = event.target
    setLoginUser(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }


  const {mutate: auth} = useAuth()


  const handleSubmit = (login) => {

    login.preventDefault();

    const userData = ({
      email: loginUser.email.toLowerCase().trim(),
      password: loginUser.password.trim()
    })

    auth(userData, {
      onSuccess:(data) => {
        // if (data.isAdmin) {
        //   props.adminLogged()
        // }
        navigate('/')
      }
    })

    // if(isSuccess) {
    //   console.log(data);
    //   console.log('successfully logged in')
    //   localStorage.setItem('isAdmin', data.isAdmin)
    //   localStorage.setItem('userName', data.name)
    //   localStorage.setItem('userEmail', data.email)
    //   localStorage.setItem('jwt', data.token)
    //   if (data.isAdmin) {
    //     props.adminLogged()
    //   }
    //   popAlert(`Welcome back`)
    //   navigate('/')
    //   return data
    // }

    // axios.post('api/users/login',{
    //   email: loginUser.email.toLowerCase().trim(),
    //   password: loginUser.password.trim()
    // })
    // .then((res) => {
    //   console.log('successfully logged in')
    //   // save user details
    //   localStorage.setItem('isAdmin', res.data.isAdmin)
    //   localStorage.setItem('userName', res.data.name)
    //   localStorage.setItem('userEmail', res.data.email)
    //   localStorage.setItem('jwt', res.data.token)
    //   if (res.data.isAdmin) {
    //     props.adminLogged()
    //   }
    //   popAlert(`Welcome back`)
    //   navigate('/')
    //   return res.data
    // },
    // (error) => {
    //   console.log(error)
    //   setErrorMessages('invalid username or password');
    // }
    // )
  };

  // Generate JSX code for login form
  const loginForm = (

    <main className='App-main'>
      <div className='login'>
        <div className="text-center m-5-auto">
          <h2 >Log In</h2>

          <form action="/" onSubmit={handleSubmit}>
            <p>
              <label>Email address</label><br/>
              <input 
                type="email"
                name="email"
                placeholder={'Enter your Email'}
                required
                autoFocus
                onChange={handleChange}
                value={loginUser.email}
              />
            </p>
            <p>
              <label>Password</label>
              <Link to="/forget-password"><label className="right-label "
              style={{color: "#007bff"}}>Forget password?</label></Link>
              <br/>
              <input 
                type="password" 
                name="password"   
                placeholder={'Enter your Password'} 
                required
                onChange={handleChange}
                value={loginUser.password}
              />
            </p>
            <div className="error">{errorMessages}</div>
            <p>
            <button id="sub_btn" type="submit" >Login</button>
            </p>
          </form>

          <footer>
              <p>First time? <Link to="/register" style={{color: "#007bff"}}>Create an account</Link>.</p>
              <p ><Link to="/" style={{color: "#007bff"}}>Back to Homepage</Link>.</p>
          </footer>
    
        </div>
      </div>
    </main>

  )

  return (
    <div>
    {loginForm}
    </div>
  )
}
