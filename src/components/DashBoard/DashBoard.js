import React from "react"
import "./dashboard.css"
import { DashboardHeader } from "./components/DashboardHeader"
import { DashboardMainSection } from "./components/DashboardMainSection"
import { DashboardCharts } from "./components/DashboardCharts"
import { Container } from "@mui/material"

export const DashBoard = () => {
  return (
    <div className='dashboard'>
      <DashboardHeader />
      <Container>
        <DashboardMainSection />
        <DashboardCharts />
      </Container>
    </div>
  )
}
