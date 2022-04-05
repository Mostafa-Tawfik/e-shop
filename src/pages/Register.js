import React from "react";
import { Link ,Navigate} from "react-router-dom";
import AppData from "../AppData";
export default function Register(){


      // User Login info
      const userList =AppData.users 

    // used for storing user input
    const [userName, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    

    // it is used to redirect to Login page
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    

    const handleSubmit = (event) => {
 
        // prevent default form submit
        event.preventDefault();
        const userData = {userName,email,password}
        userList.push(userData)
        console.log("userList",userList)
        console.log("userData",userData)
        setIsSubmitted(true);
      };
      


      const registerForm =(
                <div className='register'>
                <div className="text-center m-5-auto">
                <h2>Join us</h2>
                <h5>Create your E-Shop Account</h5>
                <form action="/home" onSubmit={handleSubmit}>
                    <p>
                        <label>Username</label><br/>
                        <input type="text" name="first_name"
                        required 
                        placeholder={'Enter your username'} 
                        onChange={(e) => setUserName(e.target.value)}
                        autoFocus
                        />
                    </p>
                    <p>
                        <label>Email address</label><br/>
                        <input type="email" name="email" required 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={'Enter your Email'} 
                        />
                    </p>
                    <p>
                        <label>Password</label><br/>
                        <input type="password" name="password" required
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={'Enter your Password'} 
                        />
                        
                    </p>
                    <p>
                        <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                    </p>
                    <p>
                        <button id="sub_btn" type="submit">Register</button>
                    </p>
                </form>
                <footer>
                    <p><Link to="/">Back to Homepage</Link>.</p>
                </footer>
            </div>
        </div>
      )
    
    return ( 
        <div>
        {isSubmitted ? <Navigate to={'/login'} /> : registerForm}
        </div>
        
   )
}