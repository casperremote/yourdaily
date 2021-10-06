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
    <div className='dashboard-main-section'>
      <CustomCards
        heading={`Total ${"\n"} Cart Person`}
        value={stats.cartBoyCount}
        isShowDetails={true}
        color='#F88A12'
        link='/details/cart-boy'
      />
      <CustomCards
        heading={`Total ${"\n"} Delivery Boy`}
        value={stats.deliveryBoyCount}
        isShowDetails={true}
        color='#F88A12'
        link='/details/delivery-boy'
      />
      <CustomCards
        heading={`Total ${"\n"} Users`}
        value={stats.userCount}
        isShowDetails={true}
        color='#19006E'
        link='/details/user-details'
      />
      <CustomCards
        heading={`Unassinged ${"\n"} Orders`}
        value={stats.unassignedOrders}
        isShowDetails={true}
        color='#F88A12'
      />
      <CustomCards
        heading={`Total ${"\n"} Items`}
        value={stats.totalItems}
        isShowDetails={true}
        color='#F88A12'
        link='/dashboard/categories'
      />

      <CustomCards
        heading={`Total ${"\n"} Active Users`}
        subHeading={`(Past 10 days order)`}
        value={stats.activeUsers}
        isShowDetails={false}
        color='#0E8B00'
      />
      <CustomCards
        heading={`Total Ongoing ${"\n"} Bookings`}
        value={stats.onGoingOrder}
        isShowDetails={true}
        color='#F88A12'
      />
      <CustomCards
        heading={`Past Week ${"\n"} Bookings`}
        value={stats.bookingForLastWeek}
        isShowDetails={true}
        color='#F88A12'
      />
      <CustomCards
        heading={`Denied / Disputed ${"\n"} Orders`}
        value={`${stats.deniedOrder} / ${stats.disputedOrder}`}
        isShowDetails={true}
        color='#F88A12'
        link='/dashboard/denied-order'
      />
      <CustomCards
        heading={`Scheduled ${"\n"} Orders`}
        value={stats.scheduledOrder}
        isShowDetails={true}
        color='#F88A12'
        link='/dashboard/scheduled-order'
      />
    </div>
  )
}
