import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import {getLocalStorage} from '../Helpers/localStorage';
import popAlert from '../Helpers/popAlert';

export const AuthContext = createContext({
  signOut: ()=>{}
});

export function AuthProvider({children}) {

  const navigate = useNavigate
  
  const [auth, setAuth] = useState({})
  
  useEffect(()=> {
    setAuth(getLocalStorage('auth',{}))
  },[])
  
  const {isAdmin, name, email, token, _id} = auth
  console.log(name);

  function signOut() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('auth')
    popAlert(`See you soon`)
    setTimeout(()=> window.location.reload(), 1500) 
    navigate('/')

  }

  return (
    <AuthContext.Provider value={{
      isAdmin, 
      userName: name,
      userEmail: email,
      jwt: token,
      userId: _id,
      signOut: signOut
    }}>
      <>{children}</>
    </AuthContext.Provider>
  );
}