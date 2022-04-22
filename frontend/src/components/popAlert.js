import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//-- use swal for pop messages

// icons: success / error / warning / info / question

const MySwal = withReactContent(Swal)

function popAlert(icon, tittle, msg) {

  MySwal.fire({
    icon: icon,
    title: <i>{tittle}</i>,
    html: <i>{msg}</i>,
  })
}

export default popAlert