import {
  IconButton,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { assignStaffRole, denyStaffRole, getStaffList } from "./helper"

export const StaffRequests = ({ handleDialogClick, openDialog }) => {
  const [userDetails, setUserDetails] = useState(null)
  const [openConfirmDialogDeny, setOpenConfirmDialogDeny] = useState(false)
  const [openConfirmDialogAccept, setOpenConfirmDialogAccept] = useState(false)
  const fetchStaffDetails = async () => {
    const response = await getStaffList()
    console.log(response.data)
    setUserDetails(response.data)
  }

  const handleConfirmDialogDeny = (id) => {
    setBoyType({ ...boyType, id: id })
    setOpenConfirmDialogDeny(!openConfirmDialogDeny)
  }
  const handleConfirmDialogAccept = (id) => {
    setBoyType({ ...boyType, id: id })
    setOpenConfirmDialogAccept(!openConfirmDialogAccept)
  }

  useEffect(() => {
    fetchStaffDetails()
  }, [])
  const [boyType, setBoyType] = useState({
    role: "",
    id: "",
  })

  const handleDenyStaffRole = async () => {
    const response = await denyStaffRole(boyType.id)
    console.log(response)

    if (response.status === 200) {
      setOpenConfirmDialogDeny(false)
      fetchStaffDetails()
    }
  }

  const handleAssignStaffRole = async () => {
    const data = {
      userID: boyType.id,
      permission: boyType.role,
    }
    const response = await assignStaffRole(data)
    console.log(response)
    if (response.status === 200) {
      setOpenConfirmDialogAccept(false)
      fetchStaffDetails()
    }
  }

  const paddingStyle = { padding: "10px" }

  const confirmDialogDeny = () => {
    return (
      <Dialog
        maxWidth='xs'
        fullWidth
        open={openConfirmDialogDeny}
        onClose={handleConfirmDialogDeny}
      >
        <DialogTitle
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#f88a12",
            color: "#fff",
            padding: "5px 10px",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            onClick={handleConfirmDialogDeny}
            style={{ color: "#fff" }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ padding: " 20px" }}>
          <Typography>Are you sure to you want to deny this staff</Typography>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "#f88a12" }}>Cancel</Button>
          <Button
            className='table-btn'
            style={{ color: "#fff" }}
            onClick={handleDenyStaffRole}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const confirmDialogAccept = () => {
    return (
      <Dialog
        maxWidth='xs'
        fullWidth
        open={openConfirmDialogAccept}
        onClose={handleConfirmDialogAccept}
      >
        <DialogTitle
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#f88a12",
            color: "#fff",
            padding: "5px 10px",
            justifyContent: "flex-end",
          }}
        >
          <IconButton
            onClick={handleConfirmDialogAccept}
            style={{ color: "#fff" }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ padding: " 20px" }}>
          <Typography>
            Choose role which you want to Assign this staff
          </Typography>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: " 10px",
          }}
        >
          <FormControl style={{ width: "200px" }}>
            <InputLabel id='demo-simple-select-label' focused>
              Role type
            </InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={boyType.role}
              label='Role type'
              //   size='small'
              onChange={(e) => setBoyType({ ...boyType, role: e.target.value })}
            >
              <MenuItem value='cart-boy'>Cart-boy</MenuItem>
              <MenuItem value='delivery-boy'>Delivery-boy</MenuItem>
            </Select>
          </FormControl>
          <Button
            className='table-btn'
            style={{ color: "#fff" }}
            size='large'
            onClick={handleAssignStaffRole}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <>
      {openConfirmDialogDeny && confirmDialogDeny()}
      {openConfirmDialogAccept && confirmDialogAccept()}
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
            {userDetails === null && <tbody></tbody>}
            <tbody>
              {userDetails !== null &&
                userDetails.map((staff, index) => {
                  return (
                    <tr key={index}>
                      <td style={paddingStyle}>{index + 1}</td>
                      <td style={paddingStyle}>{staff.id}</td>
                      <td style={paddingStyle}>{staff.name}</td>
                      <td style={paddingStyle}>{staff.phone.slice(3)}</td>
                      <td style={paddingStyle}>
                        <span>
                          <Button
                            variant='contained'
                            size='small'
                            style={{
                              color: "#fff",
                              marginRight: "10px",
                              backgroundColor: "#0E8B00",
                            }}
                            onClick={() => handleConfirmDialogAccept(staff.id)}
                          >
                            Accept
                          </Button>
                          <Button
                            style={{
                              color: "#fff",
                              backgroundColor: "#FF0000",
                            }}
                            onClick={() => handleConfirmDialogDeny(staff.id)}
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
          {userDetails !== null && userDetails.length === 0 && (
            <p>No new Staff request</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
