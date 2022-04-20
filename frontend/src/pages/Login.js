import React from 'react'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'

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


  const handleSubmit = async (login) => {

    // prevent default form submit
    login.preventDefault();

    await axios.post('api/users/login',{
      email: loginUser.email,
      password: loginUser.password
    })
    .then((res) => {
      
      console.log('successfully logged in')
      // declare user has logged in
      setIsSubmitted(true)
      props.userlogged(res.data)
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
              onChange={(e) => setLoginUser(prev => {
                return {
                  ...prev,
                  email: e.target.value
                }
              })}
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
              onChange={(e) => setLoginUser(prev => {
                return {
                  ...prev,
                  password: e.target.value
                }
              })}
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
  return (
    <div>
    {isSubmitted ? navigate('/') : loginForm}
    </div>
  )
}
