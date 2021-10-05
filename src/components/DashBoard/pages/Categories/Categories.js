import { Button, Container, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { DashboardHeader } from "../../components/DashboardHeader"
import "./categories.css"
import { useHistory } from "react-router-dom"
import { fetchCategories } from "../Helper"
export const Categories = () => {
  const history = useHistory()

  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetch() {
      const res = await fetchCategories()
      setData(res)
    }
    fetch()
  }, [])
  // console.log(data)

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
            style={{ color: "#F88A12", fontSize: "22px", cursor: "pointer", textAlign:'end' }}
          >
            + Add New Category
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
                    onClick={() => {
                      history.push(`/dashboard/categories/${item.category}`)
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
