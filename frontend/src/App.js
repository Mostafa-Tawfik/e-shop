import './App.scss';
import React, { useEffect, useState } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'

import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home';
import popAlert from './components/popAlert';


function App() {
  
  ///-- handle user login details --///
  const [userLoggedIn, setUserLoggedIn,] = React.useState('')

  ///-- handle admin login details --///
  const [isAdmin, setIsAdmin,] = React.useState(false)


  // a login function with the logged user id
  function userlogged(user) {
    setUserLoggedIn(user)
    setIsAdmin(user.isAdmin)
    setjwt(user.token)
  }

  // a logout function
  const navigate = useNavigate()

  function signOut() {
    setUserLoggedIn('')
    setIsAdmin(false)
    localStorage.removeItem(userLoggedIn)
    popAlert(userLoggedIn.name, 'See you soon')
    navigate('/')
  }

  // setup local storage for signed in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userLoggedIn'));
    if (user) {
      setUserLoggedIn(user);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userLoggedIn', JSON.stringify(userLoggedIn));
  }, [userLoggedIn]);
  ///--- end ---///


  // setup local storage for signed in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('isAdmin'));
    if (user) {
      setIsAdmin(user);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }, [isAdmin]);
  ///--- end ---///


  ///-- handle user token --///
  const [jwt, setjwt] = useState('')

  // store token in localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('jwt'));
    if (user) {
      setjwt(user);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('jwt', JSON.stringify(jwt));
  }, [jwt]);
  ///--- end ---///


  return (
    <div className="App">
      <Routes>

        {isAdmin?
          // if admin logged show dashboard
          <Route path="/*" element={
          <Dashboard 
          isAdmin={isAdmin} 
          signOut={signOut}
          />} />
          :
          // if user logged show homepage
          <Route path="/*" element={
          <Home 
          userLoggedIn={userLoggedIn}
          userlogged={userlogged}
          signOut={signOut}
          />} />
        }

      </Routes>

    </div>
  )
}

export default App;
