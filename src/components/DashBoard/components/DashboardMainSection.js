import { Container } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { baseURL } from "../../../config"
import { isAuthenticated } from "../../utils/isAuthenticated"
import { CustomCards } from "./CustomCards"

export const DashboardMainSection = () => {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      // console.log(JSON.parse(isAuthenticated()))
      const response = await axios.get(
        `${baseURL}/api/store-manager/dashboard/stats`,
        {
          headers: {
            Authorization: `${JSON.parse(isAuthenticated())}`,
          },
        }
      )
      if (response) {
        // console.log(response.data)
        setStats(response.data)
      }
    } catch (error) {
      console.log(error.response)
    }
  }
  if (stats == null) {
    return <div></div>
  }
  return (
    <Container>
      <div className='dashboard-main-section'>
        <CustomCards
          heading='Total Cart Person'
          value={stats.cartBoyCount}
          isShowDetails={true}
          color='#F88A12'
        />
        <CustomCards
          heading='Total Delivery Boy'
          value={stats.deliveryBoyCount}
          isShowDetails={true}
          color='#F88A12'
        />
        <CustomCards
          heading='Total Users'
          value={stats.userCount}
          isShowDetails={true}
          color='#19006E'
        />
        <CustomCards
          heading='Unassinged Orders'
          value={stats.unassignedOrders}
          isShowDetails={true}
          color='#F88A12'
        />
        <CustomCards
          heading='Total Items'
          value={stats.totalItems}
          isShowDetails={true}
          color='#F88A12'
        />

        <CustomCards
          heading={`Total Active Users`}
          subHeading={`(Past 10 days order)`}
          value={stats.activeUsers}
          isShowDetails={false}
          color='#0E8B00'
        />
        <CustomCards
          heading={`Total Ongoing ${"\n"} Bookings`}
          value={stats.onGoingOrder}
          isShowDetails={false}
          color='#F88A12'
        />
        <CustomCards
          heading={`Past Week ${"\n"} Bookings`}
          value={stats.bookingForLastWeek}
          isShowDetails={false}
          color='#F88A12'
        />
        <CustomCards
          heading={`Denied ${"\n"} Orders`}
          value={stats.deniedOrder}
          isShowDetails={false}
          color='#F88A12'
        />
        <CustomCards
          heading={`Disputed ${"\n"} Orders`}
          value={stats.disputedOrder}
          isShowDetails={false}
          color='#F88A12'
        />
      </div>
    </Container>
  )
}
