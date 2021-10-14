import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  IconButton,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { DashBoard } from "../../DashBoard"

export const UnAssignedOrdersModals = ({ openDialog, handleDialogClick }) => {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const oldOrders =
      JSON.parse(localStorage.getItem("new_orders")) === null
        ? []
        : JSON.parse(localStorage.getItem("new_orders"))
    setOrders(oldOrders)
  }, [])
  return (
    <div>
      <DashBoard />
    </div>
  )
}
