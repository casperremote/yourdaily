import { Container, Typography } from "@mui/material"
import React from "react"
import { useHistory } from "react-router"
import { DashboardHeader } from "../../components/DashboardHeader"
import { DeniedOrders } from "./DeniedOrders"
import { DisputedOrder } from "./DisputedOrder"
import { ScheduledOrders } from "./ScheduledOrders"

const ordersTypeArr = [
  { name: "Denied Orders", route: "denied-order" },
  { name: "Disputed Orders", route: "disputed-order" },
  { name: "Scheduled Orders", route: "scheduled-order" },
]

export const Orders = ({ match }) => {
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
            Download List
          </Typography>
        </div>
        <div className='main-nav-categories-names'>
          {ordersTypeArr
            ? ordersTypeArr.map((obj, key) => {
                return (
                  <Typography
                    key={key}
                    onClick={() => {
                      history.push(`/dashboard/${obj.route}`)
                    }}
                    style={{
                      textTransform: "capitalize",
                      fontSize: "22px",
                      cursor: "pointer",
                      border: `${
                        match.params.orderType === obj.route
                          ? "1px solid #F88A12"
                          : "1px solid #777777"
                      }`,
                      borderRadius: "10px 10px 0 0",
                      borderBottom: "none",
                      color: `${
                        match.params.orderType === obj.route
                          ? "#ffffff"
                          : "#777777"
                      } `,
                      backgroundColor: `${
                        match.params.orderType === obj.route
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
        {match.params.orderType === "denied-order" && (
          <DeniedOrders type={match.params.orderType} />
        )}
        {match.params.orderType === "disputed-order" && (
          <DisputedOrder type={match.params.orderType} />
        )}
        {match.params.orderType === "scheduled-order" && (
          <ScheduledOrders type={match.params.orderType} />
        )}
      </Container>
    </div>
  )
}
