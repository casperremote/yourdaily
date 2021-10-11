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

export const uploadOfferImage = async (file, type) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/store-manager/image/${type}`,
      file,
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

export const createOffer = async (offerData) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/store-manager/offer`,
      JSON.stringify(offerData),
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
export const deleteOffer = async () => {
  try {
    const response = await axios.delete(
      `${baseURL}/api/store-manager/offer`,
      null,
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
