import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  Divider,
  Button,
  Typography,
  IconButton,
  Paper,
  ListItemButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import UserIcon from "../../../../assets/images/userIcon.svg"
import { fetchUserDetails, fetchUserDetailsById, resetFlagUser } from "./helper"
import FlagIcon from "@mui/icons-material/Flag"
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded"

export const UsersDetails = ({ type }) => {
  const [userDetails, setUserDetails] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const [userDetailById, setUserDetailById] = useState(null)

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

  const getUserDetailsById = async (userId) => {
    const response = await fetchUserDetailsById(userId)
    console.log(response.data)
    setUserDetailById(response.data)
  }

  const handleDialog = (user) => {
    setUserDetailById(null)
    setOpenDialog(!openDialog)
    getUserDetailsById(user.id)
  }

  const handleResetFlag = async (userId) => {
    const response = await resetFlagUser(userId)
    console.log(response)
    getUserDetailsById(userId)
  }

  const userDetailPopup = () => {
    return (
      <Dialog maxWidth='md' fullWidth open={openDialog} onClose={handleDialog}>
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: "0",
          }}
        >
          <IconButton onClick={handleDialog}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent style={{ padding: " 20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <img src={UserIcon} alt='user-icon' />
            <div style={{ width: "460px" }}>
              <div className='dialog-offer-content'>
                <label>Name</label>
                <input
                  disabled
                  style={{ textTransform: "capitalize" }}
                  value={userDetailById !== null && userDetailById[0].name}
                />
              </div>
              <div className='dialog-offer-content'>
                <label>Contact</label>
                <input
                  disabled
                  value={
                    userDetailById !== null &&
                    userDetailById[0].contact.slice(3)
                  }
                />
              </div>
              <div className='dialog-offer-content'>
                <label>Reg. date</label>
                <input
                  disabled
                  value={
                    userDetailById !== null &&
                    new Date(userDetailById[0].regDate).toLocaleDateString()
                  }
                />
              </div>
            </div>
          </div>
          <Divider color='#f88a12' />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={() => handleResetFlag(userDetailById[0].id)}
              style={{ color: "#f88a12" }}
            >
              Reset Flag
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Paper
              variant='elevation'
              elevation={0}
              style={{
                textAlign: "center",
                padding: "20px",
                background:
                  "transparent linear-gradient(180deg, #FFECD7 0%, #FFC9C9 100%) 0% 0% no-repeat padding-box",
                width: "150px",
                color: "#0E8B00",
                height: "120px",
              }}
            >
              <Typography variant='h5'>
                {userDetailById !== null && userDetailById[0].totalOrders}
              </Typography>
              <Typography variant='h6'> Total Orders</Typography>
            </Paper>
            <Paper
              variant='elevation'
              elevation={0}
              style={{
                textAlign: "center",
                padding: "20px",
                background:
                  "transparent linear-gradient(180deg, #FFECD7 0%, #FFC9C9 100%) 0% 0% no-repeat padding-box",
                width: "150px",
                height: "120px",
                color: "#0E8B00",
              }}
            >
              <Typography variant='h5'>
                ???{userDetailById !== null && userDetailById[0].totalAmount}
              </Typography>
              <Typography variant='h6'> Total Amount</Typography>
            </Paper>
            <Paper
              variant='elevation'
              elevation={0}
              style={{
                textAlign: "center",
                padding: "20px",
                background:
                  "transparent linear-gradient(180deg, #FFECD7 0%, #FFC9C9 100%) 0% 0% no-repeat padding-box",
                width: "150px",
                color: "#F88A12",
                height: "120px",
              }}
            >
              <Typography variant='h5'>
                {userDetailById !== null && userDetailById[0].canceledOrders}
              </Typography>
              <Typography variant='h6'> Cancel</Typography>
            </Paper>
            <Paper
              variant='elevation'
              elevation={0}
              style={{
                textAlign: "center",
                padding: "20px",
                background:
                  "transparent linear-gradient(180deg, #FFECD7 0%, #FFC9C9 100%) 0% 0% no-repeat padding-box",
                width: "150px",
                color: "#FF0000",
                height: "120px",
              }}
            >
              <Typography variant='h5'>
                {userDetailById !== null && userDetailById[0].flagCount}
                <span>
                  <FlagIcon fontSize='medium' />
                </span>
              </Typography>
              <Typography variant='h6'> Flagged</Typography>
            </Paper>
            <Paper
              variant='elevation'
              elevation={0}
              style={{
                textAlign: "center",
                padding: "20px",
                background:
                  "transparent linear-gradient(180deg, #FFECD7 0%, #FFC9C9 100%) 0% 0% no-repeat padding-box",
                width: "150px",
                color: "#F88A12",
                height: "120px",
              }}
            >
              <Typography variant='h5'>
                {userDetailById !== null && userDetailById[0].avgRating}
                <span>
                  <StarRateRoundedIcon fontSize='medium' />
                </span>
              </Typography>
              <Typography variant='h6'> Avg. Rating</Typography>
            </Paper>
          </div>
          <div
            style={{
              display: "flex",
              flex: "1 1",
              padding: "10px",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <List>
              <ListItem style={{ backgroundColor: "#F88A12", color: "#fff" }}>
                <h4>Most used Locations</h4>
              </ListItem>
              {userDetailById === null ? (
                <ListItem></ListItem>
              ) : (
                userDetailById[0].topThreeLocation.map((location, index) => {
                  return (
                    <ListItem disablePadding key={index}>
                      <ListItemButton
                        onClick={() => {
                          window.open(
                            `https://maps.google.com/?q=${location.latitude},${location.longitude}`
                          )
                        }}
                      >
                        <ListItemText primary={location.addressData} />
                      </ListItemButton>
                    </ListItem>
                  )
                })
              )}
            </List>
            <List>
              <ListItem style={{ backgroundColor: "#F88A12", color: "#fff" }}>
                <h4>Top Three Ordered Items</h4>
              </ListItem>
              {userDetailById === null ? (
                <ListItem></ListItem>
              ) : (
                userDetailById[0].topThreeItems.map((item, index) => {
                  return (
                    <ListItem disablePadding key={index}>
                      <ListItemButton>
                        <ListItemText primary={item} />
                      </ListItemButton>
                    </ListItem>
                  )
                })
              )}
            </List>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      {openDialog && userDetailPopup()}
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
          {console.log(userDetails)}
          {userDetails &&
            userDetails.map((user, index) => {
              return (
                <tr key={index}>
                  <td
                    style={{
                      color: "#f88a12",
                      fontWeight: 600,
                      textTransform: "capitalize",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDialog(user)}
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
    </>
  )
}
