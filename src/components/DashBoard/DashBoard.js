import React from "react"
import "./dashboard.css"
import { DashboardHeader } from "./components/DashboardHeader"
import { DashboardMainSection } from "./components/DashboardMainSection"

export const DashBoard = () => {
  return (
    <div className='dashboard'>
      <DashboardHeader/>
      <DashboardMainSection/>
    </div>
  )
}
