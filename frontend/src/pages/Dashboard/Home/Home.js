import React from 'react'
import Chart from "react-apexcharts"
import useApi from '../../../hooks/useApi'

import Statistics from '../Statistics/Statistics'

function Home() {

  // fetch orders
  const {data: orders} = useApi('/api/orders', 'GET')
  // console.log(orders);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun' , 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const monthlyData = orders && months.map((month, index)=> (
    orders.filter(order => (
      (order.createdAt.charAt(6) == index + 1)
    ))
  ))

  const seriesData = monthlyData && monthlyData.map(data => {
    if(data.length > 0) return data.map(d=>d.totalPrice).reduce((x,y)=> x+y).toFixed(0)
    else return 0
  })

  // sales chart
  const salesChart = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: months
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
  
        <h3>Sales</h3>

        <article className='sales-chart-holder'>  
  
          <Chart
            className='sales-chart'
            options={salesChart.options}
            series={salesChart.series}
            type="line"
          />
  
        </article>
  
      </div>    
  )
}

export default Home