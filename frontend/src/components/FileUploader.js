import React, { useState } from 'react'
import axios from 'axios'
import popAlert from './popAlert';

function FileUploader() {

  const [file, setFile] = useState('')
  console.log(file)

  const [url, setUrl] = useState({
    image: ''
  })
  console.log(url)
  
  
  // handle upload
  async function upload(event) {
    event.preventDefault() 
    
    const formData = new FormData()
    formData.append('file', file)

    await axios({
      url: `/api/upload/`,
      method: 'POST',
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
      },
    })
    .then((res) => {
      // show success message
      console.log('uploaded')
      console.log(res)
      popAlert('Done!', 'Successfully uploaded')
      setUrl(prev => {
        return {
          ...prev,
          image: res.data.url
        }
      })
      return res.data
    },
    (error) => {
      console.log(error)
    }
    )
  }
  

  return (
    <form onSubmit={upload}>
      <div>
        <p>Image uploader</p>
        <input
        type='file'
        name='file'
        required
        onChange={(e) => setFile(e.target.files[0])}
        >
        </input>
      </div>
      <button>
        Submit
      </button>

    </form>
  )
}

export default FileUploader