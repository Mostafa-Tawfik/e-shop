import React from 'react'
import useApi from '../../../hooks/useApi'

function Coupons() {

  const {data: coupons} = useApi('/api/coupons', 'GET')
  console.log(coupons);

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
            {coupons.map(coupon => (
              <tr key={coupon._id}>

                <td 
                data-label="ID"
                style={{fontSize: '0.7rem', color: 'red'}}
                >
                  #{coupon._id}
                </td>

                <td data-label="Coupon">{coupon.coupon}</td>

                <td data-label="Value">{coupon.value}</td>

                <td data-label="Actions"></td>

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