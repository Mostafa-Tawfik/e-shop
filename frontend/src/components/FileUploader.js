import React, { useState } from 'react'
import axios from 'axios'
// import popAlert from './popAlert';

function FileUploader() {

  const [file, setFile] = useState('')
  
  
  // handle upload
  async function upload(event) {
    event.preventDefault() 
    
    const formData = new FormData();
    formData.append('file', file)
    console.log(file)

    await axios({
      url: `/api/upload`,
      method: 'POST',
      data: formData,
      headers: {
        // 'content-type': 'multipart/form-data',
         Authorization: `Bearer ${localStorage.jwt.slice(1, -1)}`
      },
      // data: updateForm
    })
    .then((res) => {
      // show success message
      console.log('uploaded')
      console.log(res)
      // popAlert('Done!', 'Product updated')
      // retrun to products page
      // setTimeout(()=> navigate('/dashboard/products'), 2000) 
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
        onChange={(e) => setFile(e.target.value)}
        value={file}
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