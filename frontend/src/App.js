import './App.scss';
import React, { useContext } from 'react'
import {Routes, Route} from 'react-router-dom'
import {QueryClientProvider, QueryClient} from 'react-query'

import Dashboard from './pages/Dashboard/Dashboard'
import Home from './pages/Home/Home';
import { AuthContext } from './context/Auth-context';


function App() {

  const queryClient = new QueryClient()

  const {isAdmin} = useContext(AuthContext)

  return (
    <QueryClientProvider client={queryClient}>

        <div className="App">
          <Routes>
            {isAdmin ?
            <Route path="/*" element={<Dashboard />}/>
            :
            <Route path="/*" element={<Home />}/>
            }
          </Routes>
        </div>

    </QueryClientProvider>
  )
}

export default App;
