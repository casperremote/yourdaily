import { Typography } from "@mui/material"
import React from "react"

import { Bar } from "react-chartjs-2"

export const AnDBookingGraphs = ({ data, setDays }) => {
  const dates = data.map((item) => {
    return new Date(item.date).toISOString().slice(5,10)
  })
  const declinedOrders = data.map((item) => {
    return item.declinedOrders
  })
  const acceptedOrders = data.map((item) => {
    return item.acceptedOrders
  })
  //   console.log(dates, declinedOrders, acceptedOrders)

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
        label: "Accepted orders",
        data: [...acceptedOrders],
        backgroundColor: "#6AFF6A",
      },
      {
        label: "Denied orders",
        data: [...declinedOrders],
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
        Accepted and denied booking graph
      </Typography>
      <div className='dashboard-graph-options'>
        <select name='location' id='location'>
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
            Accepted
          </Typography>
          <div
            className='graph-label-box'
            style={{ backgroundColor: "#FF8383" }}
          ></div>
          <Typography variant='h5' color='GrayText'>
            Denied
          </Typography>
        </div>
      </div>
      <Bar data={lineChart} options={options} />
    </div>
  )
}
