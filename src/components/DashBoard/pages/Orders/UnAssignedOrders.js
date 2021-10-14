import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  IconButton,
} from "@mui/material"
import React, { useState } from "react"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

export const UnAssignedOrders = ({ openDialog, handleDialogClick }) => {
  const [orders, setOrders] = useState([])

  return (
    <>
      <Dialog
        maxWidth='md'
        fullWidth
        open={openDialog}
        onClose={handleDialogClick}
      >
        <DialogTitle
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#f88a12",
            color: "#fff",
            padding: "10px 20px",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant='caption'
            style={{ fontSize: "22px", fontWeight: "600" }}
          >
            New Request List
          </Typography>
          <IconButton onClick={handleDialogClick} style={{ color: "#fff" }}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ padding: 0 }}>
          <table className='categories-table'>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>User ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Action</th>
              </tr>
            </thead>
            {orders === null && <tbody></tbody>}
            <tbody>
              {orders !== null &&
                orders.map((staff, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{staff.id}</td>
                      <td>{staff.name}</td>
                      <td>{staff.phone.slice(3)}</td>
                      <td>
                        <span>
                          <Button
                            variant='contained'
                            size='small'
                            style={{
                              color: "#fff",
                              marginRight: "10px",
                              backgroundColor: "#0E8B00",
                            }}
                          >
                            Accept
                          </Button>
                          <Button
                            style={{
                              color: "#fff",
                              backgroundColor: "#FF0000",
                            }}
                            variant='contained'
                            size='small'
                          >
                            Deny
                          </Button>
                        </span>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          {orders !== null && orders.length === 0 && (
            <p>No new Staff request</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
