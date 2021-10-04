import React, { useState } from "react"
import "./Login.css"
import Logo from "../../assets/images/logo.png"
import Illustrator from "../../assets/images/Illustrator.png"
import PersonIcon from "@mui/icons-material/Person"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import {
  Button,
  Container,
  createTheme,
  InputAdornment,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material"
import { baseURL } from "../../config"
import axios from "axios"
import { Redirect, useHistory } from "react-router"
import { isAuthenticated } from "../utils/isAuthenticated"

const theme = createTheme({
  palette: {
    primary: {
      main: "#010101",
    },
  },
})

const Login = () => {
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  if (isAuthenticated()) {
    return <Redirect to='/dashboard' />
  }

  const data = {
    email,
    password,
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${baseURL}/api/sm-login`,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log(response.data)
      localStorage.setItem(
        "Authorization",
        JSON.stringify(response.data.Authorization)
      )
      history.push("/dashboard")
    } catch (error) {
      console.log(error.response.data)
      alert(error.response.data.messageToUser)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className='login-container'>
        <Container>
          <div className='logo-container'>
            <img src={Logo} alt='Yours Daily' />
          </div>
          <div className='login-content-wrapper'>
            <img className='login-image' src={Illustrator} alt='bg' />
            <div>
              <Paper elevation={3} style={{ borderRadius: "10px" }}>
                <form onSubmit={handleSubmit} className='login-paper-box'>
                  <div>
                    <Typography variant='h5' style={{ fontWeight: "600" }}>
                      LOGIN
                    </Typography>
                    <Typography variant='caption' color='textSecondary'>
                      Please login into your account.
                    </Typography>
                  </div>
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label='User ID'
                    variant='outlined'
                    size='medium'
                    inputProps={{ style: { fontSize: 14 } }}
                    placeholder='enter your used id'
                    focused
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label='Password'
                    variant='outlined'
                    size='medium'
                    inputProps={{ style: { fontSize: 14 } }}
                    placeholder='enter your password'
                    focused
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <VisibilityOffIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type='submit'
                    className='login-btn'
                    size='large'
                    style={{ color: "white" }}
                  >
                    LOGIN
                  </Button>
                  <div className='login-forgot-password'>
                    <Typography variant='caption' className='forgot-password'>
                      Forgot Password?
                    </Typography>
                  </div>
                </form>
              </Paper>
            </div>
          </div>
        </Container>
      </div>
    </ThemeProvider>
  )
}

export default Login
