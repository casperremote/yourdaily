import { Button, Container, Typography } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { baseURL } from "../../../../config"
import { isAuthenticated } from "../../../utils/isAuthenticated"
import { DashboardHeader } from "../../components/DashboardHeader"
import "./categories.css"

export const Categories = () => {
  const [data, setData] = useState(null)

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/store-manager/category`,
        {
          headers: {
            Authorization: `${JSON.parse(isAuthenticated())}`,
          },
        }
      )
      if (response) {
        console.log(response.data)
        setData(response.data)
      }
    } catch (error) {
      console.log()
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  if (data == null) {
    return <div></div>
  }

  return (
    <div>
      <DashboardHeader />
      <Container>
        <div className='main-nav-categories'>
          <Typography
            style={{ color: "#777777", fontSize: "22px", cursor: "pointer" }}
          >
            back
          </Typography>
          <Typography
            style={{ color: "#F88A12", fontSize: "22px", cursor: "pointer" }}
          >
            + Add New Categories
          </Typography>
        </div>
        <table className='categories-table'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Categories Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td
                    style={{
                      color: "#F88A12",
                      textTransform: "capitalize",
                      cursor: "pointer",
                    }}
                  >
                    {item.category}
                  </td>
                  <td>
                    <Button
                      className='table-btn'
                      size='small'
                      style={{ color: "#fff" }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Container>
    </div>
  )
}
