import React from "react";
import { Link ,Navigate} from "react-router-dom";
import axios from 'axios'

export default function Register(){

    // used for storing user input
    const [newUser, setNewUser] = React.useState({
        name: '',
        email: '',
        password: ''
    });


    // it is used to redirect to Login page
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    

    const handleSubmit = async (login) => {

        // prevent default form submit
        login.preventDefault();

        await axios.post('api/users/',{
            name: newUser.name,
            email: newUser.email,
            password: newUser.password
        })
        .then((res) => {
            alert('successfully registered')
            console.log(res.data)
            setIsSubmitted(true)
            return <Navigate to="/login"/>
        },
        (error) => {
            console.log(error)
        }
        )
    };
      


    const registerForm =(
        <div className='register'>
            <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your E-Shop Account</h5>
            <form action="/home" onSubmit={handleSubmit}>
                <p>
                    <label>Username</label><br/>
                    <input 
                    type="text" 
                    name="name"
                    required 
                    placeholder={'Enter your username'} 
                    onChange={(e) => setNewUser(prev => {
                        return {
                            ...prev,
                            name: e.target.value
                        }
                    })}
                    autoFocus
                    />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input 
                    type="email" 
                    name="email" 
                    required 
                    onChange={(e) => setNewUser(prev => {
                        return {
                            ...prev,
                            email: e.target.value
                        }
                    })}
                    placeholder={'Enter your Email'} 
                    />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input 
                    type="password" 
                    name="password" 
                    required
                    onChange={(e) => setNewUser(prev => {
                        return {
                            ...prev,
                            password: e.target.value
                        }
                    })}
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