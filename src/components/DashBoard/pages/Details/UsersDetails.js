import { Tooltip } from "@mui/material"
import React, { useEffect, useState } from "react"
import {  fetchUserDetails } from "./helper"

export const UsersDetails = ({ type }) => {
  const [userDetails, setUserDetails] = useState(null)

  const fetchDetails = async () => {
    const response = await fetchUserDetails()
    console.log(response)
    setUserDetails(response)
  }

  useEffect(() => {
    fetchDetails()
  }, [])

  if (userDetails === null) {
    return <div></div>
  }

  return (
    <table className='categories-table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Contact</th>
          <th>Primary Location</th>
          <th>Total Orders</th>
          <th>Denied</th>
          <th>Cancel</th>
          <th>Average Rating</th>
          <th>Flagged</th>
        </tr>
      </thead>
      <tbody>
        {userDetails &&
          userDetails.map((user, index) => {
            return (
              <tr key={index}>
                <td
                  style={{
                    color: "#f88a12",
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                >
                  {user.name}
                </td>
                <td>{user.contact.slice(3)}</td>
                <td
                  style={{
                    maxWidth: "200px",
                    // display: 'block',
                    overflow: "hidden",
                  }}
                >
                  <Tooltip
                    placement='bottom'
                    style={{ fontSize: "18px" }}
                    onClick={() => {
                      window.open(
                        `https://maps.google.com/?q=${user.defaultAddressLat},${user.defaultAddressLong}`
                      )
                    }}
                    title={`${user.defaultAddress}`}
                  >
                    <p
                      style={{
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                    >
                      {user.defaultAddress}
                    </p>
                  </Tooltip>
                </td>
                <td style={{ color: "#F88A12" }}>{user.totalOrders}</td>
                <td style={{ color: "#ff0000" }}>{user.deniedOrders}</td>
                <td style={{ color: "#4612F8" }}>{user.canceledOrders}</td>
                <td>{user.avgRating}</td>
                <td>{user.flagCount}</td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}
