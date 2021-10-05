import { Container, Typography } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { baseURL } from "../../../../config"
import { isAuthenticated } from "../../../utils/isAuthenticated"
import { DashboardHeader } from "../../components/DashboardHeader"
import { fetchCategories, updateItem } from "../Helper"
import Tick from "../../../../assets/images/true-tick.svg"
import UnTick from "../../../../assets/images/false-untick.svg"

export const Items = ({ match }) => {
  const history = useHistory()
  const [tempInstock, setTempInstock] = useState({ inStock: null, id: null })
  const [categories, setCategories] = useState(null)
  const [allItems, setAllItems] = useState(null)

  const [categoryId, setCategoryId] = useState(null)

  const fetchItemsByCategory = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/store-manager/item`, {
        headers: {
          Authorization: `${JSON.parse(isAuthenticated())}`,
        },
      })
      if (response) {
        // console.log(response.data)
        setAllItems(response.data)
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    async function fetch() {
      const res = await fetchCategories()
      fetchItemsByCategory()
      setCategories(res)
    }
    fetch()
  }, [tempInstock])

  useEffect(() => {
    if (categories != null) {
      const item = categories.filter(
        (item) => item.category === match.params.categoryName
      )
      setCategoryId(item[0].id)
      // console.log(categoryId)
    }
  }, [match.params.categoryName, categories])

  const handleUpdateStock = async (item) => {
    const data = {
      category: item.categoryID,
      name: item.name,
      price: item.price,
      strikeThroughPrice: item.strikeThroughPrice,
      inStock: !item.inStock,
      baseQuantity: item.baseQuantity,
    }
    const response = await updateItem(data, item.id)
    console.log(response.data)
    if (response.status === 201) {
      setTempInstock({ inStock: response.data.inStock, id: item.id })
    }
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
          <Typography style={{ fontSize: "22px", textAlign: "center" }}>
            Items
          </Typography>
          <Typography
            style={{
              color: "#F88A12",
              fontSize: "22px",
              cursor: "pointer",
              textAlign: "end",
            }}
          >
            + Add New Item
          </Typography>
        </div>
        <div className='main-nav-categories-names'>
          {categories
            ? categories.map((item, key) => {
                return (
                  <Typography
                    key={key}
                    onClick={() => {
                      history.push(`/dashboard/categories/${item.category}`)
                    }}
                    style={{
                      textTransform: "capitalize",
                      fontSize: "22px",
                      cursor: "pointer",
                      color: `${
                        match.params.categoryName === item.category
                          ? "#F88A12"
                          : "#777777"
                      } `,
                    }}
                  >
                    {item.category}
                  </Typography>
                )
              })
            : null}
        </div>
        <table className='categories-table'>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Image</th>
              <th style={{ textTransform: "capitalize" }}>
                {match.params.categoryName} Name
              </th>
              <th>Base Qty.</th>
              <th>
                Price
                <br /> (per base Qty.)
              </th>
              <th>In Stock</th>
            </tr>
          </thead>
          <tbody>
            {allItems &&
              allItems
                .filter((item) => item.categoryID === categoryId)
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      <th>{index}</th>
                      <th>
                        <img
                          src={item.itemImageLinks[0]}
                          alt={index.toString()}
                          style={{
                            padding: "0",
                            maxWidth: "120px",
                          }}
                        />
                      </th>
                      <th
                        style={{
                          color: "#F88A12",
                          textTransform: "capitalize",
                        }}
                      >
                        {item.name}
                      </th>
                      <th>{item.baseQuantity}</th>
                      <th>Rs. {item.price}</th>
                      <th>
                        {
                          <img
                            onClick={() => {
                              handleUpdateStock(item)
                            }}
                            src={
                              tempInstock.id === item.id && tempInstock !== null
                                ? tempInstock
                                  ? Tick
                                  : UnTick
                                : item.inStock
                                ? Tick
                                : UnTick
                            }
                            alt={
                              tempInstock != null
                                ? tempInstock.toString()
                                : item.inStock.toString()
                            }
                          />
                        }
                      </th>
                    </tr>
                  )
                })}
          </tbody>
        </table>
      </Container>
    </div>
  )
}
