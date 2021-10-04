import { Typography } from "@mui/material"
import React from "react"

import { Bar } from "react-chartjs-2"

export const NownScheduledOrders = ({ data, setDays }) => {
  const dates = data.map((item) => {
    return new Date(item.date).toISOString().slice(5,10)
  })
  const scheduledOrders = data.map((item) => {
    return item.scheduledOrders
  })
  const nowOrders = data.map((item) => {
    return item.nowOrders
  })
  //   console.log(dates, scheduledOrders, nowOrders)

  const daysArray = [
    { name: "14 days", value: 14 },
    { name: "30 days", value: 30 },
    { name: "60 months", value: 60 },
  ]
  const locationArray = ["Golf Course", "Gaur City", "Noida"]

  const lineChart = {
    labels: [...dates],
    datasets: [
      {
        label: "Now",
        data: [...nowOrders],
        backgroundColor: "#6AFF6A",
      },
      {
        label: "Scheduled",
        data: [...scheduledOrders],
        backgroundColor: "#FF8383",
      },
    ],
  }
  const options = {
    plugins: {
      legend: {
        labels: false,
      },
    },
    scales: {
      xAxis: {
        grid: {
          display: false,
        },
      },
      yAxis: {
        grid: {
          display: false,
        },
      },
    },
  }
  return (
    <div className='dashboard-graph-wrapper'>
      <Typography
        style={{ fontSize: "28px", color: "#777777", fontWeight: 600 }}
      >
        Booking (Now vs Scheduled)
      </Typography>
      <div className='dashboard-graph-options'>
        <select name='location' id='location'>
          <option value='all location'>All locations</option>
          {locationArray.map((item, key) => (
            <option key={key}>{item}</option>
          ))}
        </select>
        <select name='days' id='days' onChange={(e) => setDays(e.target.value)}>
          {daysArray.map((item, key) => (
            <option key={key} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
        <div className='label-container'>
          <div
            className='graph-label-box'
            style={{ backgroundColor: "#6AFF6A" }}
          ></div>
          <Typography variant='h5' color='GrayText'>
            Now
          </Typography>
          <div
            className='graph-label-box'
            style={{ backgroundColor: "#FF8383" }}
          ></div>
          <Typography variant='h5' color='GrayText'>
            Scheduled
          </Typography>
        </div>
      </div>
      <Bar data={lineChart} options={options}/>
    </div>
  )
}
