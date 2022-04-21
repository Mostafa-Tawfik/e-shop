import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//-- use swal for pop messages

const MySwal = withReactContent(Swal)

function popAlert(tittle, msg) {

  MySwal.fire({
    icon: 'success',
    title: <i>{tittle}</i>,
    html: <i>{msg}</i>,
  })
}

export default popAlert