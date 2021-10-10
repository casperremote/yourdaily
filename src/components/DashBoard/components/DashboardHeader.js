import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
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
import { fetchOffer } from "./helper"

export const DashboardHeader = () => {
  const history = useHistory()

  const [openDialog, setOpenDialog] = useState(false)
  const [offerData, setOfferData] = useState(null)

  const fetchOfferData = async () => {
    const response = await fetchOffer()
    console.log(response)
  }

  useEffect(() => {
    fetchOfferData()
  }, [])

  const handleDialogClick = useCallback(() => {
    setOpenDialog(!openDialog)
  }, [openDialog])

  const handleLogout = () => {
    localStorage.clear()
    history.push("/")
  }

  const showOfferDialog = () => {
    return (
      <Dialog
        maxWidth='sm'
        fullWidth
        open={openDialog}
        onClose={handleDialogClick}
      >
        <DialogTitle>
          <IconButton>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className='dialog-offer-content'>
            <label>Title</label>
            <TextField />
          </div>
          <div className='dialog-offer-content'>
            <label>Discount</label>
            <TextField />
          </div>
          <div className='dialog-offer-content'>
            <label>Description</label>
            <TextField />
          </div>
          {/* {offerData.imageUrl !== null && (
            <img src={offerData.imageUrl} alt='offer' />
          )} */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClick}>Cancel</Button>
          <Button onClick={handleDialogClick}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    )
  }
  return (
    <>
      {openDialog && showOfferDialog()}
      <div className='header-dashboard'>
        <Container>
          <div className='header-dashboard-wrapper'>
            <div
              className='header-dashboard-logo'
              onClick={() => {
                history.push("/")
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
              <IconButton onClick={handleDialogClick}>
                <LocalOfferIcon style={{ color: "#fff" }} />
              </IconButton>
              <IconButton>
                <PersonAddAltIcon style={{ color: "#fff" }} />
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
