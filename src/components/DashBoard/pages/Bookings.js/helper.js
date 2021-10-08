import axios from "axios"
import { baseURL } from "../../../../config"
import { isAuthenticated } from "../../../utils/isAuthenticated"

export const fetchOnGoingOrders = async () => {
  try {
    const response = await axios.get(
      `${baseURL}/api/store-manager/dashboard/order/active`,
      {
        headers: {
          Authorization: `${JSON.parse(isAuthenticated())}`,
        },
      }
    )
    if (response) {
      console.log(response)
      return response.data
    }
  } catch (error) {
    return error.response
  }
}

export const fetchPastOrders = async (dates) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/store-manager/dashboard/order/history`,
      JSON.stringify(dates),
      {
        headers: {
          Authorization: `${JSON.parse(isAuthenticated())}`,
        },
      }
    )
    if (response) {
      console.log(response)
      return response.data
    }
  } catch (error) {
    return error.response
  }
}
