import axios from "axios"
import { baseURL } from "../../../config"
import { isAuthenticated } from "../../utils/isAuthenticated"

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${baseURL}/api/store-manager/category`, {
      headers: {
        Authorization: `${JSON.parse(isAuthenticated())}`,
      },
    })
    if (response) {
      // console.log(response.data)
      return response.data
    }
  } catch (error) {
    return error.response
  }
}
