import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import popAlert from '../components/popAlert';

export default function Login(props) {

  const navigate = useNavigate()

  // Error Message State
  const [errorMessages, setErrorMessages] = React.useState('');

  // it is used to redirect to home page
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
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


  const handleSubmit = async (login) => {

    // prevent default form submit
    login.preventDefault();

    await axios.post('api/users/login',{
      email: loginUser.email,
      password: loginUser.password
    })
    .then((res) => {
      console.log('successfully logged in')
      setIsSubmitted(true)
      // save user details
      props.userlogged(res.data)
      popAlert(`Welcome back`)
      // if admin go to dashboard
      if(res.data.isAdmin){
        navigate('/')
      }
      return res.data
    },
    (error) => {
      console.log(error)
      setErrorMessages('invalid username or password');
    }
    )
  };

  // Generate JSX code for login form
  const loginForm = (

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
  )

  // if submitted go to home page
  useEffect(()=> {
    if(isSubmitted) {
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isSubmitted])

  return (
    <div>
    {loginForm}
    </div>
  )
}
