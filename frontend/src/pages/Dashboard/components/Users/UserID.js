import axios from 'axios'
import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

function UserID() {

  const params = useParams()

  // store users
  const [user, setUser] = useState('')
  console.log(user)

  // fetch all users
  useEffect(()=> {
    axios.get(`/api/users/${params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
      }
    })
    .then(data => setUser(data.data))
  },[])


  return (
    <div>UserID</div>
  )
}

export default UserID