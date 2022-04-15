import React from 'react'
import { Link ,Navigate } from 'react-router-dom'

import AppData from'../AppData'


export default function Login(props) {
   
    // User Login info
    const userList =AppData.users  

    // Error Messages States
    const errors = {
      uname: "invalid username",
      pass: "invalid password"
    };
    // Error Message State
    const [errorMessages, setErrorMessages] = React.useState({});
 
 
    // it is used to redirect to home page
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    // used for storing user input
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    const handleSubmit = (event) => {
 
      // prevent default form submit
      event.preventDefault();
    
      // check if user is already registered
      console.log(userList)
      //const user = userList.find(user => user.email === email);
      // Find user login info in the defined userList
      const userData = userList.find((user) => user.email === email);
      console.log("userData",email)
      // Compare user info
      if (userData) {
        if (userData.password !== password) {
          // Invalid password
          setErrorMessages({ name: "pass", message: errors.pass });
        } else {

          console.log('Succesffully logged in')
          setIsSubmitted(true);
          // declare which user has logged in
          props.userlogged(userList.filter(u => u.id === userData.id))
          return <Navigate to="/home" />

        }
      } 
      else {
        
        // Username not found
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
    );
    // Generate JSX code for login form
    const loginForm = (

      <div className='login'>
      <div className="text-center m-5-auto">
          <h2 >Log In</h2>
          <form action="/" onSubmit={handleSubmit}>
              <p>
                  <label>Email address</label><br/>
                  <input type="email" name="email_address" placeholder={'Enter your Email'} 
                  required   autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  />
                  {renderErrorMessage("uname")}
              </p>
              <p>
                  <label>Password</label>
                  <Link to="/forget-password"><label className="right-label "
                  style={{color: "#007bff"}}>Forget password?</label></Link>
                  <br/>
                  <input type="password" name="password"   placeholder={'Enter your Password'} 
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  />
                  {renderErrorMessage("pass")}
              </p>
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
