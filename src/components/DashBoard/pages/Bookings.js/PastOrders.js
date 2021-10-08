import { Typography } from "@mui/material"
import React from "react"

export const PastOrders = ({ ordersData }) => {
  if (ordersData === null) {
    return (
      <>
        <table className='categories-table'>
          <thead>
            <tr>
              <th>OrderID</th>
              <th>Delivery Address</th>
              <th>Contact</th>
              <th>Order Type / Order Mode</th>
              <th> Time & Date</th>
              <th>Items</th>
            </tr>
          </thead>
        </table>
        {ordersData === null && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              marginTop: "30px",
            }}
          >
            <Typography
              style={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "20px",
              }}
              variant='overline'
              color='gray'
            >
              Select start date and end date
            </Typography>
          </div>
        )}
      </>
    )
  }
  return (
    <>
      <table className='categories-table'>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Delivery Address</th>
            <th>Contact</th>
            <th>Order Type / Order Mode</th>
            <th> Time & Date</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {ordersData &&
            ordersData.map((order, index) => {
              return (
                <tr key={index}>
                  <td
                    style={{
                      color: "#f88a12",
                      fontWeight: 600,
                      textTransform: "capitalize",
                    }}
                  >
                    {order.orderID}
                  </td>
                  <td>{order.userAddress}</td>
                  <td>{order.userPhone}</td>
                  <td>{order.orderType + "/" + order.orderMode}</td>
                  <td>
                    {new Date(order.createdAt).toLocaleTimeString() +
                      "\n" +
                      new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    {order.items.map((item, key) => {
                      return (
                        <p key={key}>
                          {item.name}
                          <br />
                        </p>
                      )
                    })}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>

      {ordersData.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <Typography
            style={{ textAlign: "center", fontWeight: "600", fontSize: "20px" }}
            variant='overline'
            color='gray'
          >
            No ongoing orders right now!
          </Typography>
        </div>
      )}
    </>
  )
}
