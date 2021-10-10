import axios from "axios"
import { baseURL } from "../../../config"
import { isAuthenticated } from "../../utils/isAuthenticated"

export const fetchOffer = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/store-manager/offer`, {
      headers: {
        Authorization: `${JSON.parse(isAuthenticated())}`,
      },
    })
    if (response) {
      //   console.log(response)
      return response.data
    }
  } catch (error) {
    return error.response
  }
}
