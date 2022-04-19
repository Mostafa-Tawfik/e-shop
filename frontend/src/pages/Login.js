import React from 'react'
import { Link ,Navigate } from 'react-router-dom'
import axios from 'axios'

export default function Login(props) {
   
    // Error Message State
    const [errorMessages, setErrorMessages] = React.useState('');
 
    // it is used to redirect to home page
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    // used for storing user input
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    const handleSubmit = async (login) => {
 
      // prevent default form submit
      login.preventDefault();

      await axios.post('api/users/login',{
        email: email,
        password: password
      })
      .then((res) => {
        
        console.log('successfully logged in')
        // declare user has logged in
        props.userlogged(res.data)
        setIsSubmitted(true)
        return <Navigate to="/login"/>
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
      {isSubmitted ? <Navigate to={'/'} /> : loginForm}
      </div>
    )
}
