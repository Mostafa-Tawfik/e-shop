import React from 'react'
import useApi from '../../../hooks/useApi'
import Select from 'react-dropdown-select'
import popCrud from '../../../Helpers/popCrud'
import popAction from '../../../Helpers/popAction'
import apiCrud from '../../../Helpers/apiCrud'

function Coupons() {

  const {data: coupons} = useApi('/api/coupons', 'GET')

  // create new coupon
  function createCoupon() {
    popCrud(
      'Create a coupon', 
      'Create', 
      ['coupon', 'value'], 
      `/api/coupons/`,
      'POST',
      'Coupon created'
    )
  }

  // set controls for the action menu
  const actionsMenu = [
    {
      value: (id)=> popCrud(
        'Coupon Update', 
        'Update', 
        ['coupon', 'value'], 
        `/api/coupons/${id}`,
        'PUT',
        'Coupon updated'
      ),
      label: 'Update'
    },

    {
      value: (id)=>popAction(
        'Are you sure?', 
        "You won't be able to revert this!",
        'Yes, delete it!',
        ()=>apiCrud(`/api/coupons/${id}`, 'DELETE', 'Coupon deleted')()
      ),
      label: 'Delete'
    },
  ]

  return (
    <div className='coupons'>

      <h2>Coupons</h2>

      <button 
      onClick={()=>createCoupon()}
      className='coupons-create-btn'>
        <p>+ Create new coupon</p>
      </button>

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