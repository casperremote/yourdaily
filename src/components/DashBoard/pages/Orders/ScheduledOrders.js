import { Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { fetchScheduledOrders } from "./helper"

export const ScheduledOrders = () => {
  const [orders, setOrders] = useState(null)

  const fetchOrders = async () => {
    const response = await fetchScheduledOrders()
    if (response) {
      setOrders(response)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (orders === null) {
    return <div></div>
  }
  return (
    <table className='categories-table'>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Delivery Address</th>
          <th>Date & Time</th>
          <th>Mode</th>
          <th>Amount</th>
          <th>Items</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders &&
          orders.map((order, index) => {
            return (
              <tr key={index}>
                <td>{order.id}</td>
                <td
                  style={{
                    maxWidth: "200px",
                  }}
                >
                  <p
                    // style={{
                    //   textOverflow: "ellipsis",
                    //   whiteSpace: "nowrap",
                    //   overflow: "hidden",
                    //   cursor: "pointer",
                    // }}
                  >
                    {order.address.addressData}
                  </p>
                </td>
                <td>
                  Start Date: {new Date(order.startDate).toLocaleDateString()}
                  <br />
                  Delivery Time:
                  {new Date(order.deliveryTime).toLocaleTimeString()}
                  <br />
                  {order.weekdays.map((day, index) => {
                    return <span key={index}> {day}</span>
                  })}
                </td>
                <td>{order.mode}</td>
                <td>{order.amount}</td>
                <td>
                  {order.items.map((item, key) => {
                    return <p>{item.name}</p>
                  })}
                </td>
                <td>
                  <Button style={{ color: "#fff" }} className='table-btn'>
                    Cancel
                  </Button>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}
