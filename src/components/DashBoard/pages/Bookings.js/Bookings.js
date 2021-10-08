import { Container, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { DashboardHeader } from "../../components/DashboardHeader"
import { OnGoingOrders } from "./OnGoingOrders"
import { PastOrders } from "./PastOrders"
import "rsuite/dist/rsuite.min.css"

import DateRangePicker from "rsuite/DateRangePicker"
import { fetchPastOrders } from "./helper"
const bookingTypeArr = [
  { name: "Ongoing Orders", route: "ongoing-orders" },
  { name: "Past Orders", route: "past-orders" },
]
export const Bookings = ({ match }) => {
  const [value, setValue] = React.useState([])
  const [pastordersData, setPastordersData] = useState(null)
  const fetchOrders = async () => {
    const dateRange = {
      startDate: new Date(value[0]).toISOString(),
      endDate: new Date(value[1]).toISOString(),
    }
    console.log(dateRange)
    const response = await fetchPastOrders(dateRange)
    // console.log(response)
    setPastordersData(response)
  }

  useEffect(() => {
    value.length !== 0 && fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

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
          <DateRangePicker
            value={value}
            size='lg'
            disabledDate={DateRangePicker.afterToday()}
            showOneCalendar
            onChange={setValue}
            placeholder='Select Date Range'
          />
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
        {match.params.bookingType === "past-orders" && (
          <PastOrders ordersData={pastordersData} />
        )}
      </Container>
    </div>
  )
}
