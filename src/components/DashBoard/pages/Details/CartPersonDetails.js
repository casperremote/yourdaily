import { Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { fetchStaffDetails, enableDisableStaff } from "./helper"
import Tick from "../../../../assets/images/true-tick.svg"
import UnTick from "../../../../assets/images/false-untick.svg"

export const CartPersonDetails = ({ type }) => {
  const [staffDetails, setStaffDetails] = useState(null)

  const fetchDetails = async () => {
    const response = await fetchStaffDetails(type)
    setStaffDetails(response)
  }

  useEffect(() => {
    fetchDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (staffDetails === null) {
    return <div></div>
  }

  const handleEnableDisable = async (id, enabled) => {
    const response = await enableDisableStaff(
      id,
      enabled ? "disable" : "enable"
    )
    if (response.success) {
      fetchDetails()
    }
  }

  return (
    <table className='categories-table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Contact</th>
          <th>Registration Date</th>
          <th>Total Orders</th>
          <th>Denied</th>
          <th>Cancel</th>
          <th>Total Business</th>
          <th>Average Rating</th>
          <th>Flagged</th>
          <th>Enable Disable</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {staffDetails &&
          staffDetails.map((staff, index) => {
            return (
              <tr key={index}>
                <td
                  style={{
                    color: "#f88a12",
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                >
                  {staff.name}
                </td>
                <td>{staff.contact.slice(3)}</td>
                <td>{new Date(staff.regDate).toLocaleDateString()}</td>
                <td style={{ color: "#F88A12" }}>{staff.totalOrders}</td>
                <td style={{ color: "#ff0000" }}>{staff.deniedOrders}</td>
                <td style={{ color: "#4612F8" }}>{staff.canceledOrders}</td>
                <td>{staff.totalAmount}</td>
                <td>{staff.avgRating}</td>
                <td>{staff.flagged}</td>
                <td>
                  <img
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEnableDisable(staff.id, staff.enabled)}
                    src={staff.enabled ? Tick : UnTick}
                    alt={staffDetails.toString()}
                  />
                </td>
                <td>
                  <Button
                    style={{
                      color: "#fff",
                      fontSize: "12px",
                      textTransform: "capitalize",
                      padding: "3px".length,
                      margin: "0 6px",
                    }}
                    className='table-btn'
                  >
                    Change Role
                  </Button>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}
