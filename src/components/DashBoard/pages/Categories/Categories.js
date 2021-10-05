import { Button, Container, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { DashboardHeader } from "../../components/DashboardHeader"
import "./categories.css"
import { useHistory } from "react-router-dom"
import { createCategory, fetchCategories, deleteCategory } from "../Helper"
export const Categories = () => {
  const history = useHistory()
  const [createButton, setCreateButton] = useState(true)
  const [toggleCreate, setToggleCreate] = useState(false)
  const [data, setData] = useState(null)
  const [input, setInput] = useState("")

  useEffect(() => {
    async function fetch() {
      const res = await fetchCategories()
      setData(res)
    }
    fetch()
  }, [])

  // console.log(data)

  useEffect(() => {
    input.length > 0 ? setCreateButton(false) : setCreateButton(true)
  }, [input.length])

  const handleCreate = async () => {
    const response = await createCategory({ category: input })
    if (response) {
      // console.log(response)
      setData([...data, response])
      setInput("")
      setToggleCreate(false)
    }
  }

  const handleDelete = async (item) => {
    const response = await deleteCategory(item.id)
    if (response) {
      const res = data.findIndex(obj => obj.id === item.id)
      // console.log(res)
      setData([...data.slice(0,res),...data.slice(res+1)])
    }
  }

  if (data == null) {
    return <div></div>
  }

  const createCategoryDiv = () => {
    return (
      <div className='main-nav-categories-create'>
        <input
          type='text'
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
          style={{ fontSize: "22px", padding: "10px", margin: "0 10px" }}
        />
        <Button
          onClick={handleCreate}
          className='table-btn'
          disabled={createButton}
          style={{
            color: "#fff",
            fontSize: "22px",
            padding: "6px 20px",
            textTransform: "capitalize",
            margin: "0 10px",
            opacity: `${createButton ? "0.5" : "1"}`,
          }}
        >
          Create
        </Button>
        <Button
          onClick={() => {
            setToggleCreate(false)
          }}
          className='table-btn'
          style={{
            color: "#fff",
            fontSize: "22px",
            padding: "6px 20px",
            textTransform: "capitalize",
            margin: "0 10px",
          }}
        >
          Cancel
        </Button>
      </div>
    )
  }

  const mainNav = () => {
    return (
      <div className='main-nav-categories'>
        <Typography
          style={{ color: "#777777", fontSize: "22px", cursor: "pointer" }}
        >
          back
        </Typography>
        <Typography
          onClick={() => {
            setToggleCreate(true)
          }}
          style={{
            color: "#F88A12",
            fontSize: "22px",
            cursor: "pointer",
            textAlign: "end",
          }}
        >
          + Add New Category
        </Typography>
      </div>
    )
  }

  return (
    <div>
      <DashboardHeader />
      <Container>
        {!toggleCreate ? mainNav() : createCategoryDiv()}
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
                      onClick={() => handleDelete(item)}
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
