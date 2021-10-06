import { Tooltip } from "@mui/material"
import React, { useEffect, useState } from "react"
import { fetchOrdersByType } from "./helper"
import Tick from "../../../../assets/images/true-tick.svg"

export const DisputedOrder = () => {
  const [orders, setOrders] = useState(null)

  const fetchOrders = async () => {
    const response = await fetchOrdersByType("disputed")
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
          <th>S.No.</th>
          <th>Order ID</th>
          <th>User Address</th>
          <th>Disputed Time</th>
          <th>Resolved Time</th>
          <th>Contact</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders &&
          orders.map((order, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.orderId}</td>
                <td
                  style={{
                    maxWidth: "200px",
                    overflow: "hidden",
                  }}
                >
                  <Tooltip
                    placement='bottom'
                    style={{ fontSize: "18px" }}
                    title={`${order.userAddress}`}
                  >
                    <p
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                    >
                      {order.userAddress}
                    </p>
                  </Tooltip>
                </td>
                <td>
                  {`${new Date(
                    order.disputedAt
                  ).toLocaleTimeString()} , ${new Date(
                    order.disputedAt
                  ).toLocaleDateString()}`}
                </td>
                <td>
                  {`${new Date(
                    order.resolvedAt
                  ).toLocaleTimeString()} , ${new Date(
                    order.resolvedAt
                  ).toLocaleDateString()}`}
                </td>
                <td>{order.userPhone.slice(3)}</td>
                <td>
                  <img src={Tick} alt='Resolved' />
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}
