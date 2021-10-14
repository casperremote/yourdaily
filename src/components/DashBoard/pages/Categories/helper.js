import axios from "axios"
import { baseURL } from "../../../../config"
import { isAuthenticated } from "../../../utils/isAuthenticated"

export const createItem = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/store-manager/item`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `${JSON.parse(isAuthenticated())}`,
        },
      }
    )
    if (response) {
      //   console.log(response)
      return response
    }
  } catch (error) {
    return error.response
  }
}
