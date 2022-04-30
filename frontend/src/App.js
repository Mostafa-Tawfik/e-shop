import './App.scss';
import React, { useEffect, useState } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import {QueryClientProvider, QueryClient} from 'react-query'

import popAlert from './Helpers/popAlert';

import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home';


function App() {

  const queryClient = new QueryClient()

  // save admin in a state
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(()=> {
    const admin = JSON.parse(localStorage.getItem('isAdmin'))
    if(admin) {
      setIsAdmin(admin)
    }
  },[])

  useEffect(() => {
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }, [isAdmin]);


  function adminLogged() {
    setIsAdmin(true)
  }
  
  // a signOut function
  const navigate = useNavigate()

  function signOut() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('isAdmin')
    setIsAdmin(false)
    popAlert(`See you soon`)
    navigate('/')
  }


  return (
    <QueryClientProvider client={queryClient}>

      <div className="App">
        <Routes>

          {isAdmin ? 
          <Route path="/*" element={<Dashboard signOut={signOut}/>}/>
          :
          <Route path="/*" element={<Home signOut={signOut} adminLogged={adminLogged}/>}/>
          }
          
        </Routes>

      </div>

    </QueryClientProvider>
  )
}

export default App;
