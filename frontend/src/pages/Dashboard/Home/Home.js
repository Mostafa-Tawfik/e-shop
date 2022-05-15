import React from 'react'
import Chart from "react-apexcharts"
import useApi from '../../../hooks/useApi'

import Statistics from '../Statistics/Statistics'

function Home() {

  // fetch orders
  const {data: orders} = useApi('/api/orders', 'GET')
  // console.log(orders);

  const seriesData = orders && orders.map(order => ([
    Date.parse(order.createdAt), Number(order.totalPrice).toFixed(0)
  ]))

  // sales chart
  const salesChart = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        type: 'datetime'
      }
    },
    series: [
      {
        name: "Sales",
        data: seriesData
      }
    ]
  }
  

  return (
    seriesData && 
      <div className='dashboard-section'>
  
        <Statistics />
  
        <article>
  
          <h3>Sales</h3>
  
          <Chart
            options={salesChart.options}
            series={salesChart.series}
            type="bar"
            width="100%"
          />
  
        </article>
  
      </div>    
  )
}

export default Home