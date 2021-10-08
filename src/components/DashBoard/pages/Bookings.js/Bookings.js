import { Container, Typography } from "@mui/material"
import React from "react"
import { useHistory } from "react-router"
import { DashboardHeader } from "../../components/DashboardHeader"
import { OnGoingOrders } from "./OnGoingOrders"
import { PastOrders } from "./PastOrders"
const bookingTypeArr = [
  { name: "Ongoing Orders", route: "ongoing-orders" },
  { name: "Past Orders", route: "past-orders" },
]

export const Bookings = ({ match }) => {
  const history = useHistory()
  return (
    <div>
      <DashboardHeader />
      <Container>
        <div className='main-nav-categories'>
          <Typography
            onClick={() => {
              history.push("/dashboard")
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
            {match.params.bookingType === "past-orders" && "Download List"}
          </Typography>
        </div>
        <div className='main-nav-categories-names'>
          {bookingTypeArr
            ? bookingTypeArr.map((obj, key) => {
                return (
                  <Typography
                    key={key}
                    onClick={() => {
                      history.push(`/dashboard/orders/${obj.route}`)
                    }}
                    style={{
                      textTransform: "capitalize",
                      fontSize: "22px",
                      cursor: "pointer",
                      border: `${
                        match.params.bookingType === obj.route
                          ? "1px solid #F88A12"
                          : "1px solid #777777"
                      }`,
                      borderRadius: "10px 10px 0 0",
                      borderBottom: "none",
                      color: `${
                        match.params.bookingType === obj.route
                          ? "#ffffff"
                          : "#777777"
                      } `,
                      backgroundColor: `${
                        match.params.bookingType === obj.route
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
        {match.params.bookingType === "ongoing-orders" && <OnGoingOrders />}
        {match.params.bookingType === "past-orders" && <PastOrders />}
      </Container>
    </div>
  )
}
