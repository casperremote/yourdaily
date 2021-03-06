import {
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material"
import React, { useCallback, useEffect, useState } from "react"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import LogoutIcon from "@mui/icons-material/Logout"
import { useHistory } from "react-router"
import SVGLogo from "../../../assets/images/logosvg.svg"
import CategoryIcon from "@mui/icons-material/Category"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import { Button } from "rsuite"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import MyLocationIcon from "@mui/icons-material/MyLocation"
import {
  createOffer,
  deleteOffer,
  fetchNewOrders,
  fetchOffer,
  getStaffList,
  uploadImage,
} from "./helper"
import { StaffRequests } from "./StaffRequests"
import PhoneIcon from "@mui/icons-material/Phone"

import Badge from "@mui/material/Badge"

export const DashboardHeader = () => {
  const history = useHistory()

  const [openStaffDialog, setOpenStaffDialog] = useState(false)
  const [stafflistCount, setStafflistCount] = useState(0)
  const [openOfferDialog, setOpenOfferDialog] = useState(false)
  const [addOfferToggle, setAddOfferToggle] = useState(true)
  const [loading, setLoading] = useState({ img: false, offerData: false })
  const [offerData, setOfferData] = useState({
    title: "",
    discount: 0,
    description: "",
    imgUrl: "",
  })
  const [createOfferData, setCreateOfferData] = useState({
    title: "",
    discount: 0,
    description: "",
    imageId: "",
  })

  const [offerImg, setOfferImg] = useState({
    file: "",
    previewPath: "",
    uploaded: false,
  })

  useEffect(() => {
    const getStaffCount = async () => {
      const response = await getStaffList()
      if (response) {
        setStafflistCount(response.data.length)
      }
    }
    getStaffCount()
  }, [])

  const handleStaffDialog = () => {
    setOpenStaffDialog(!openStaffDialog)
  }

  const fetchOfferData = async () => {
    const response = await fetchOffer()
    console.log(response)
    setOfferData({
      ...offerData,
      title: response.title === null ? "" : response.title,
      discount: response.discount,
      description: response.description === null ? "" : response.description,
      imgUrl: response.imageUrl,
    })
  }

  useEffect(() => {
    fetchOfferData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOfferDialogClick = useCallback(() => {
    setOpenOfferDialog(!openOfferDialog)
    setAddOfferToggle(true)
  }, [openOfferDialog])

  const handleLogout = () => {
    localStorage.clear()
    history.push("/")
  }

  const handleImageChange = (e) => {
    // console.log(e.target.files[0])
    setOfferImg({
      ...offerImg,
      file: e.target.files[0],
      previewPath: URL.createObjectURL(e.target.files[0]),
      uploaded: false,
    })
  }

  const handleOfferDataChange = (e) => {
    setCreateOfferData({ ...createOfferData, [e.target.name]: e.target.value })
  }

  const uploadImg = async () => {
    const formData = new FormData()
    formData.append("offer", offerImg.file)
    setLoading({ ...loading, img: true })
    const response = await uploadImage(formData, "offer")
    // console.log(response)
    if (response.status === 200) {
      setLoading({ ...loading, img: false })
      setOfferImg({ ...offerImg, uploaded: true })
      setCreateOfferData({ ...createOfferData, imageId: response.data.imageId })
    }
  }

  const handleCreateOfferButtonSave = async () => {
    const data = {
      title: createOfferData.title,
      discount: parseInt(createOfferData.discount),
      description: createOfferData.description,
      imageId: createOfferData.imageId,
    }
    const response = await createOffer(data)
    console.log(response)
    if (response.status === 201) {
      console.log(response.data)
      handleOfferDialogClick()
      setCreateOfferData({
        title: "",
        discount: 0,
        description: "",
        imageId: "",
      })
      setOfferImg({
        file: "",
        previewPath: "",
        uploaded: false,
      })
      fetchOfferData()
    }
  }

  const handleDeleteOffer = async () => {
    const response = await deleteOffer()
    console.log(response)
    setOfferData({
      title: "",
      discount: 0,
      description: "",
      imgUrl: "",
    })
  }

  const showOfferDialog = () => {
    return (
      <Dialog
        maxWidth='sm'
        fullWidth
        open={openOfferDialog}
        onClose={handleOfferDialogClick}
      >
        <DialogTitle
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          {/* <Typography variant='overline' style={{ fontSize: "24px" }}>
          </Typography> */}
          <IconButton onClick={handleOfferDialogClick}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className='dialog-offer-content'>
            <label>Offer Title</label>
            <TextField
              size='small'
              name='title'
              onChange={handleOfferDataChange}
              disabled={addOfferToggle}
              value={addOfferToggle ? offerData.title : createOfferData.title}
            />
          </div>
          <div className='dialog-offer-content'>
            <label>Discount</label>
            <TextField
              size='small'
              name='discount'
              type='number'
              onChange={handleOfferDataChange}
              disabled={addOfferToggle}
              value={
                addOfferToggle ? offerData.discount : createOfferData.discount
              }
            />
          </div>
          <div className='dialog-offer-content'>
            <label>Description</label>
            <TextField
              size='small'
              name='description'
              onChange={handleOfferDataChange}
              disabled={addOfferToggle}
              value={
                addOfferToggle
                  ? offerData.description
                  : createOfferData.description
              }
            />
          </div>
          {!addOfferToggle && (
            <div className='dialog-offer-content'>
              <label> Upload Image</label>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <input
                  type='file'
                  id='upload-photo'
                  name='upload-photo'
                  style={{ display: "none" }}
                  onChange={(e) => handleImageChange(e)}
                />
                <label htmlFor='upload-photo'>
                  <Typography
                    style={{
                      borderRadius: "10px",
                      color: "#fff",
                      padding: "6px 20px",
                      backgroundColor: "lightblue",
                      cursor: "pointer",
                    }}
                    aria-label='add'
                  >
                    Select Image
                  </Typography>
                </label>

                <Button
                  className='table-btn'
                  onClick={uploadImg}
                  disabled={
                    offerImg.uploaded || offerImg.previewPath.length === 0
                  }
                  style={{ marginLeft: "30px", color: "#fff" }}
                >
                  {loading.img ? (
                    <CircularProgress size={20} style={{ color: "#fff" }} />
                  ) : offerImg.uploaded ? (
                    "Uploaded"
                  ) : (
                    "Upload"
                  )}
                </Button>
              </div>
            </div>
          )}
          {offerImg.previewPath !== "" && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={offerImg.previewPath} alt={"offer"} width='250px' />
            </div>
          )}
          {offerData.imgUrl.length !== 0 && addOfferToggle ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={offerData.imgUrl} alt='offer' width='250px' />
            </div>
          ) : (
            addOfferToggle && (
              <Typography
                variant='h6'
                color='red'
                style={{ textAlign: "center" }}
              >
                No offers right now!
              </Typography>
            )
          )}
        </DialogContent>

        <DialogActions
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          {offerData.title === "" ? (
            <Button
              className='table-btn'
              style={{ color: "#fff", padding: "10px 30px", fontSize: "18px" }}
              onClick={handleOfferDialogClick}
            >
              Cancel
            </Button>
          ) : (
            <Button
              className='table-btn'
              style={{ color: "#fff", padding: "10px 30px", fontSize: "18px" }}
              onClick={handleDeleteOffer}
            >
              Delete
            </Button>
          )}

          {addOfferToggle ? (
            <Button
              className='table-btn'
              style={{ color: "#fff", padding: "10px 30px", fontSize: "18px" }}
              onClick={() => setAddOfferToggle(false)}
            >
              Add Offer
            </Button>
          ) : (
            <Button
              className='table-btn'
              disabled={!offerImg.uploaded}
              style={{
                color: "#fff",
                padding: "10px 30px",
                fontSize: "18px",
                opacity: `${offerImg.uploaded ? "1" : "0.5"}`,
              }}
              onClick={handleCreateOfferButtonSave}
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    )
  }
  const [snackOpen, setSnackOpen] = useState(false)
  const [latestOrders, setLatestOrders] = useState([])
  const [notificationQueue, setNotificationQueue] = useState([])

  const handleSnackBar = () => {
    setSnackOpen(!snackOpen)
  }

  const handleSnackBarByID = useCallback(
    (orderID) => {
      const notifications = [...notificationQueue]
      notifications.splice(
        notifications.findIndex((order) => order.orderID === orderID),
        1
      )
      setNotificationQueue(notifications)
    },
    [notificationQueue]
  )

  useEffect(() => {
    setInterval(async () => {
      const res = await fetchNewOrders()
      // console.log(res)
      console.log(res.status)
      const newOrders = res.data
      const oldOrders =
        JSON.parse(localStorage.getItem("new_orders")) === null
          ? []
          : JSON.parse(localStorage.getItem("new_orders"))
      console.log(newOrders)
      console.log(oldOrders)
      var latestOrdersArr = []
      for (let i = 0; i < newOrders.length; i++) {
        var c = 0
        for (let j = 0; j < oldOrders.length; j++) {
          if (newOrders[i].orderID === oldOrders[j].orderID) {
            c++
          }
        }
        if (c === 0) {
          latestOrdersArr.push(newOrders[i])
        }
      }
      // console.log(latestOrdersArr)

      setLatestOrders(latestOrdersArr)

      localStorage.setItem("new_orders", JSON.stringify(res.data))
    }, 5000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (notificationQueue.length > 0) {
      setSnackOpen(true)
    }
    setNotificationQueue([...notificationQueue, ...latestOrders])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestOrders])

  return (
    <>
      {snackOpen && (
        <Snackbar
          open={snackOpen}
          onClose={handleSnackBar}
          autoHideDuration={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <div>
            {notificationQueue.map((order, key) => {
              return (
                <div className='snackbar-list' key={key}>
                  <div className='snackbar-header'>
                    <Typography style={{ fontWeight: "600" }}>
                      New Order - {order.orderID}
                    </Typography>
                    <IconButton
                      onClick={() => handleSnackBarByID(order.orderID)}
                    >
                      <CloseRoundedIcon style={{ color: "#fff" }} />
                    </IconButton>
                  </div>
                  <div className='snackbar-body'>
                    <div
                      style={{
                        display: "flex ",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className='snackbar-content'>
                        <PhoneIcon style={{ marginRight: "10px" }} />
                        <Typography variant='caption' fontSize={16}>
                          {order.userPhone}
                        </Typography>
                      </div>

                      <span
                        style={{
                          float: "right",
                          color: "#F88A12",
                          fontWeight: "600",
                        }}
                      >
                        Order Type <br />
                        <span
                          style={{
                            float: "right",
                            color: "grey",
                            fontWeight: "600",
                          }}
                        >
                          {order.orderType}
                        </span>
                      </span>
                    </div>
                    <div className='snackbar-content'>
                      <MyLocationIcon style={{ marginRight: "10px" }} />
                      <Typography variant='caption'>
                        {order.userAddressData}
                      </Typography>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Snackbar>
      )}

      {openOfferDialog && showOfferDialog()}
      {openStaffDialog && (
        <StaffRequests
          handleDialogClick={handleStaffDialog}
          openDialog={openStaffDialog}
        />
      )}

      <div className='header-dashboard'>
        <Container>
          <div className='header-dashboard-wrapper'>
            <div
              className='header-dashboard-logo'
              onClick={() => {
                history.push("/")
                // setPlaySound(true)
              }}
            >
              <img src={SVGLogo} alt='company-logo' />
              <Typography
                fontSize={22}
                style={{ color: "#fff", fontWeight: 600 }}
              >
                Dashboard
              </Typography>
            </div>
            <div className='dashboard-header-icons'>
              <IconButton
                onClick={() => {
                  history.push("/dashboard/categories")
                }}
              >
                <CategoryIcon style={{ color: "#fff" }} />
              </IconButton>
              <IconButton onClick={handleOfferDialogClick}>
                <LocalOfferIcon style={{ color: "#fff" }} />
              </IconButton>
              <IconButton onClick={handleStaffDialog}>
                <Badge badgeContent={stafflistCount} color='error'>
                  <PersonAddAltIcon style={{ color: "#fff" }} />
                </Badge>
              </IconButton>
              <IconButton onClick={handleLogout}>
                <LogoutIcon style={{ color: "#fff" }} />
              </IconButton>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}
