import { Tooltip } from "@mui/material"
import React, { useEffect, useState } from "react"
import { fetchOrdersByType } from "./helper"

export const DeniedOrders = () => {
  const [orders, setOrders] = useState(null)

  const fetchOrders = async () => {
    
    const response = await fetchOrdersByType("denied")
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
          <th>Delivery Address</th>
          <th>Contact</th>
          <th>Order Type</th>
          <th>Delivery Time</th>
        </tr>
      </thead>
      <tbody>
        {orders &&
          orders.map((order, index) => {
            return (
              <tr key={index}>
                <td>{index+1}</td>
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
                    title={`${order.addressData}`}
                  >
                    <p
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                    >
                      {order.addressData}
                    </p>
                  </Tooltip>
                </td>
                <td>{order.userPhone.slice(3)}</td>
                <td>{order.orderType}</td>
                <td>{`${new Date(order.deliveryTime).toLocaleTimeString()} ${new Date(order.deliveryTime).toLocaleDateString()}`}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}
