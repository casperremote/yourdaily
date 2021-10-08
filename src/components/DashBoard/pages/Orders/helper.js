import axios from "axios"
import { baseURL } from "../../../../config"
import { isAuthenticated } from "../../../utils/isAuthenticated"

export const fetchOrdersByType = async (orderType) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/store-manager/dashboard/order/${orderType}`,
      {
        headers: {
          Authorization: `${JSON.parse(isAuthenticated())}`,
        },
      }
    )
    if (response) {
      // console.log(response.data)
      return response.data
    }
  } catch (error) {
    return error.response
  }
}

export const fetchScheduledOrders = async (orderType) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/store-manager/scheduled/orders`,
      {
        headers: {
          Authorization: `${JSON.parse(isAuthenticated())}`,
        },
      }
    )
    if (response) {
      // console.log(response.data)
      return response.data
    }
  } catch (error) {
    return error.response
  }
}
