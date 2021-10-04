import axios from "axios"
import React, { useEffect, useState } from "react"
import { baseURL } from "../../../config"
import { isAuthenticated } from "../../utils/isAuthenticated"
import { AnDBookingGraphs } from "./AnDBookingGraphs"
import { NownScheduledOrders } from "./NownScheduledOrders"

export const DashboardCharts = () => {
  const [daysGraph1, setDaysGraph1] = useState(14)
  const [daysGraph2, setDaysGraph2] = useState(14)
  const [graph1Data, setGraph1Data] = useState(null)
  const [graph2Data, setGraph2Data] = useState(null)

  const fetchGraph1Data = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/store-manager/dashboard/adg/${daysGraph1}`,
        {
          headers: {
            Authorization: `${JSON.parse(isAuthenticated())}`,
          },
        }
      )
      if (response.data) {
        // console.log(response.data)
        setGraph1Data(response.data)
      }
    } catch (error) {
      console.log(error.response)
    }
  }
  const fetchGraph2Data = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/store-manager/dashboard/nsg/${daysGraph2}`,
        {
          headers: {
            Authorization: `${JSON.parse(isAuthenticated())}`,
          },
        }
      )
      if (response.data) {
        // console.log(response.data)
        setGraph2Data(response.data)
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchGraph1Data()
    fetchGraph2Data()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daysGraph1, daysGraph2])

  if (graph1Data == null) {
    return <div></div>
  }
  if (graph2Data == null) {
    return <div></div>
  }
  return (
    <div>
      <AnDBookingGraphs data={graph1Data} setDays={setDaysGraph1} />
      <NownScheduledOrders data={graph2Data} setDays={setDaysGraph2} />
    </div>
  )
}
