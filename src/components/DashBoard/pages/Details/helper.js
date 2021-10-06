import axios from "axios"
import { baseURL } from "../../../../config"
import { isAuthenticated } from "../../../utils/isAuthenticated"

export const fetchStaffDetails = async (staff) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/store-manager/dashboard/staff/${staff}`,
      {
        headers: {
          Authorization: `${JSON.parse(isAuthenticated())}`,
        },
      }
    )
    if (response) {
      //   console.log(response.data)
      return response.data
    }
  } catch (error) {
    return error.response
  }
}
export const enableDisableStaff = async (id, toggleType) => {
  try {
    const response = await axios.put(
      `${baseURL}/api/store-manager/staff/${toggleType}/${id}`,
      null,
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

export const updateStaffRole = async (data) => {
  try {
    const response = await axios.put(
      `${baseURL}/api/store-manager/staff/update/role`,
      JSON.stringify(data),
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

export const fetchUserDetails = async (staff) => {
  try {
    const response = await axios.get(
      `${baseURL}/api/store-manager/dashboard/user/details`,
      {
        headers: {
          Authorization: `${JSON.parse(isAuthenticated())}`,
        },
      }
    )
    if (response) {
      //   console.log(response.data)
      return response.data
    }
  } catch (error) {
    return error.response
  }
}
