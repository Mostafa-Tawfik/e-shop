import React, { useState } from 'react'
import axios from 'axios'
import popAlert from './popAlert';

function FileUploader(props) {

  const [file, setFile] = useState('')
  // console.log(file)

  
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
      popAlert('Uploaded')
      props.handleUpload(res.data.url)
      return res.data
    },
    (error) => {
      console.log(error)
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
          Upload
        </button>

      </div>      

    </div>
  )
}

export default FileUploader