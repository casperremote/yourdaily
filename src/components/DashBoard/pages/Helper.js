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

export const createCategory = async (data) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/store-manager/category`,
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
    return error.response.data
  }
}

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(
      `${baseURL}/api/store-manager/category/${id}`,
      {
        headers: {
          Authorization: `${JSON.parse(isAuthenticated())}`,
        },
      }
    )
    if (response.status === 200) {
      return true
    }
  } catch (error) {
    return error.response
  }
}

export const updateItem = async (data, id) => {
  try {
    const response = await axios.put(
      `${baseURL}/api/store-manager/item/${id}`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `${JSON.parse(isAuthenticated())}`,
        },
      }
    )
    if (response.status === 201) {
      // console.log(response.data)
      return response
    }
  } catch (error) {
    return error.response
  }
}
