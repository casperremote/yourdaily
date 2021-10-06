import { Container, Typography } from "@mui/material"
import React from "react"
import { useHistory } from "react-router"
import { DashboardHeader } from "../../components/DashboardHeader"
// import DownloadIcon from "@mui/icons-material/Download"
import { CartPersonDetails } from "./CartPersonDetails"
import { DeliveryBoyDetails } from "./DeliveryBoyDetails"
import { UsersDetails } from "./UsersDetails"

const detailsArr = [
  { name: "Cart Person Details", route: "cart-boy" },
  { name: "Delivery Boy Details", route: "delivery-boy" },
  { name: "User Details", route: "user-details" },
]

export const Details = ({ match }) => {
  const history = useHistory()
  return (
    <div>
      <DashboardHeader />
      <Container>
        <div className='main-nav-categories'>
          <Typography
          onClick={()=>{
            history.push('/dashboard')
          }}
            style={{ color: "#777777", fontSize: "22px", cursor: "pointer" }}
          >
            back
          </Typography>

          <Typography
            style={{
              color: "#777777",
              fontSize: "22px",
              cursor: "pointer",
              textAlign: "end",
            }}
          >
            Download User Detail
          </Typography>
        </div>
        <div className='main-nav-categories-names'>
          {detailsArr
            ? detailsArr.map((obj, key) => {
                return (
                  <Typography
                    key={key}
                    onClick={() => {
                      history.push(`/details/${obj.route}`)
                    }}
                    style={{
                      textTransform: "capitalize",
                      fontSize: "22px",
                      cursor: "pointer",
                      border: `${
                        match.params.pageName === obj.route
                          ? "1px solid #F88A12"
                          : "1px solid #777777"
                      }`,
                      borderRadius:"10px 10px 0 0",
                      borderBottom: 'none',
                      color: `${
                        match.params.pageName === obj.route
                          ? "#ffffff"
                          : "#777777"
                      } `,
                      backgroundColor: `${
                        match.params.pageName === obj.route
                          ? "#F88A12"
                          : "#ffffff"
                      } `,
                    }}
                  >
                    {obj.name}
                  </Typography>
                )
              })
            : null}
        </div>
        {match.params.pageName === 'cart-boy' && <CartPersonDetails type={match.params.pageName} />}
        {match.params.pageName === 'delivery-boy' && <DeliveryBoyDetails type={match.params.pageName} />}
        {match.params.pageName === 'user-details' && <UsersDetails type={match.params.pageName} />}
      </Container>
    </div>
  )
}
