import React, { useState } from 'react'
import axios from 'axios'
import popAlert from './popAlert';

function FileUploader(props) {

  const [file, setFile] = useState('')
  // console.log(file)

  const [isLoading, setIsLoading] = useState(false)
  
  
  // handle upload
  async function upload(event) {
    event.preventDefault() 
    setIsLoading(true)
    
    const formData = new FormData()
    formData.append('file', file)

    await axios({
      url: `/api/upload/`,
      method: 'POST',
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${localStorage.jwt}`
      },
    })
    .then((res) => {
      // show success message
      console.log('uploaded')
      console.log(res)
      popAlert('Uploaded')
      props.handleUpload(res.data.url)
      setIsLoading(false)
      return res.data
    },
    (error) => {
      console.log(error)
      setIsLoading(false)
    }
    )
  }
  

  return (
    <div className='file-uploader'>
      <p>Image uploader</p>

      <div id='file-uploader-input'>
        <input
        type='file'
        name='file'
        onChange={(e) => setFile(e.target.files[0])}
        >
        </input>

        <button onClick={upload}  id='file-uploader-input-btn'>
          {isLoading ? 'Loading...' : 'Upload'}
        </button>

      </div>      

    </div>
  )
}

export default FileUploader