import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { fetchCategories } from "../Helper"
import { uploadImage } from "../../components/helper"
import { createItem } from "./helper"

export const CreateItemDialog = ({ handleDialog, openDialog, getFetch }) => {
  const [categories, setCategories] = useState(null)
  const [itemCategory, setitemCategory] = useState("")
  const [loading, setLoading] = useState({ img: false })
  const [createItemDetails, setCreateItemDetails] = useState({
    name: "",
    category: "",
    price: 0,
    inStock: true,
    baseQuantity: "",
    imageId: null,
  })
  const [itemImg, setItemImg] = useState({
    file: "",
    previewPath: "",
    uploaded: false,
  })

  useEffect(() => {
    async function fetch() {
      const res = await fetchCategories()
      setCategories(res)
      //   console.log(res)
    }
    fetch()
  }, [])

  const handleCategorySelect = (event) => {
    setitemCategory(event.target.value)
    // console.log(event.target.value)
  }

  const handleInputChange = (e) => {
    setCreateItemDetails({
      ...createItemDetails,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e) => {
    // console.log(e.target.files[0])
    setItemImg({
      ...itemImg,
      file: e.target.files[0],
      previewPath: URL.createObjectURL(e.target.files[0]),
      uploaded: false,
    })
  }
  const uploadImg = async () => {
    const formData = new FormData()
    formData.append("item", itemImg.file)
    setLoading({ ...loading, img: true })
    const response = await uploadImage(formData, "item")
    console.log(response)
    if (response.status === 200) {
      setLoading({ ...loading, img: false })
      setItemImg({ ...itemImg, uploaded: true })
      setCreateItemDetails({
        ...createItemDetails,
        imageId: response.data.imageId,
      })
    }
  }

  const handleButtonSave = async () => {
    console.log(createItemDetails)
    const data = {
      name: createItemDetails.name,
      category: parseInt(itemCategory.id),
      price: parseInt(createItemDetails.price),
      inStock: true,
      imageId: createItemDetails.imageId,
      baseQuantity: createItemDetails.baseQuantity,
    }
    const response = await createItem(data)
    console.log(response)
    if (response.status === 201) {
      console.log(response.data)

      setCreateItemDetails({
        name: "",
        category: "",
        price: 0,
        inStock: true,
        baseQuantity: "",
        imageId: null,
      })
      setItemImg({
        file: "",
        previewPath: "",
        uploaded: false,
      })
      getFetch()
      handleDialog()
    }
  }

  return (
    <Dialog onClose={handleDialog} open={openDialog} fullWidth maxWidth='md'>
      <DialogTitle style={{ display: "flex", justifyContent: "flex-end" }}>
        {/* <Typography style={{ fontSize: "26px" }}>Create Item</Typography> */}
        <IconButton onClick={handleDialog}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className='dialog-offer-content'>
          <label>Category</label>
          <Select
            value={itemCategory}
            size='small'
            style={{ width: "235px" }}
            onChange={handleCategorySelect}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem disabled value=''>
              <em>Select one</em>
            </MenuItem>
            {categories !== null &&
              categories.map((cat) => {
                return (
                  <MenuItem key={cat.id} value={cat}>
                    {cat.category}
                  </MenuItem>
                )
              })}
          </Select>
        </div>
        <div className='dialog-offer-content'>
          <label>Item Name</label>
          <TextField size='small' name='name' onChange={handleInputChange} />
        </div>
        <div className='dialog-offer-content'>
          <label>Base Qty</label>
          <TextField
            size='small'
            name='baseQuantity'
            onChange={handleInputChange}
          />
        </div>
        <div className='dialog-offer-content'>
          <label>Price</label>
          <TextField
            size='small'
            type='number'
            name='price'
            onChange={handleInputChange}
          />
        </div>
        {/* <div className='dialog-offer-content'>
          <label>MRP</label>
          <TextField size='small' name='mrp' />
        </div> */}
        <div className='dialog-offer-content'>
          <label>Upload image</label>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              type='file'
              id='upload-photo'
              name='upload-photo'
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e)}
            />
            <label htmlFor='upload-photo'>
              <Typography
                style={{
                  borderRadius: "10px",
                  color: "#fff",
                  padding: "6px 20px",
                  backgroundColor: "lightblue",
                  cursor: "pointer",
                }}
                aria-label='add'
              >
                Select Image
              </Typography>
            </label>
            {!itemImg.uploaded ? (
              <Button
                className='table-btn'
                disabled={itemImg.previewPath.length === 0}
                style={{ color: "#fff", marginLeft: "20px" }}
                onClick={uploadImg}
              >
                Upload
              </Button>
            ) : (
              <Button
                className='table-btn'
                disabled={itemImg.uploaded}
                style={{ color: "#fff", marginLeft: "6px" }}
              >
                Uploaded
              </Button>
            )}
          </div>
          {itemImg.previewPath !== "" && !itemImg.uploaded && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src={itemImg.previewPath} alt={"offer"} width='200px' />
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ color: "#fff", fontSize: "18px", padding: "5px 30px" }}
            className='table-btn'
            onClick={handleButtonSave}
          >
            Save & Create item
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
