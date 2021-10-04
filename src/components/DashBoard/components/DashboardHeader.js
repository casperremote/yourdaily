import { Container, IconButton, Typography } from "@mui/material"
import React from "react"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import LogoutIcon from "@mui/icons-material/Logout"
import { useHistory } from "react-router"
import SVGLogo from "../../../assets/images/logosvg.svg"
import CategoryIcon from '@mui/icons-material/Category';

export const DashboardHeader = () => {
  const history = useHistory()

  const handleLogout = () => {
    localStorage.clear()
    history.push("/")
  }

  return (
    <div className='header-dashboard'>
      <Container>
        <div className='header-dashboard-wrapper'>
          <div className="header-dashboard-logo" onClick={()=>{
            history.push('/')
          }}>
            <img src={SVGLogo} alt='company-logo' />
            <Typography
              fontSize={22}
              style={{ color: "#fff", fontWeight: 600 }}
            >
              Dashboard
            </Typography>
          </div>
          <div className='dashboard-header-icons'>
            <IconButton onClick={()=>{
              history.push('/dashboard/categories')
            }}>
              <CategoryIcon style={{ color: "#fff" }} />
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
  )
}
