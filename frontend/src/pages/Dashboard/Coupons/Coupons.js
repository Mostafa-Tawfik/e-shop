import React from 'react'
import useApi from '../../../hooks/useApi'
import Select from 'react-dropdown-select'
import popCrud from '../../../Helpers/popCrud'

function Coupons() {

  const {data: coupons} = useApi('/api/coupons', 'GET')

  // set controls for sort drop menu
  const actionsMenu = [

    {value: (id)=> popCrud(
      'Coupon Update', 
      'Update', 
      ['coupon', 'value'], 
      `/api/coupons/${id}`,
      'PUT',
      'Coupon updated'),
    label: 'Update'},

    {value: ()=>({sort: 'discount'}),
    label: 'Delete'},

  ]

  function action(rating, msg) {
    popCrud(`Rating: ${rating}`, msg, 'Close!')
  }

  return (
    <div className='coupons'>
      <h2>Coupons</h2>
      {coupons &&
      <div className="coupons-table-holder">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Coupon</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {coupons.slice(0).reverse().map(coupon => (
              <tr key={coupon._id}>

                <td 
                data-label="ID"
                style={{fontSize: '0.7rem', color: 'red'}}
                >
                  #{coupon._id}
                </td>

                <td data-label="Coupon">{coupon.coupon}</td>

                <td data-label="Value">{coupon.value}</td>

                <td data-label="Actions" className='coupons-table-actions'>
                  <Select
                    placeholder='...'
                    searchable= {false}
                    options={actionsMenu}
                    onChange={(value, id)=>value[0].value(coupon._id)}
                  />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }
    </div>
  )
}

export default Coupons