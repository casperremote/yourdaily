import { Typography } from "@mui/material"
import React from "react"
import { useHistory } from "react-router"

export const CustomCards = ({
  heading,
  subHeading,
  value,
  color,
  link,
  isShowDetails,
}) => {

  const history = useHistory()

  return (
    <div className='custom-cards'>
      <div
        className='custom-cards-top'
        style={{
          padding: "10px 0",
          borderRadius: `${isShowDetails ? "10px 10px 0px 0px" : "10px"}`,
          height: `${isShowDetails ? "auto" : "180px"}`,
        }}
      >
        <Typography
          fontSize={isShowDetails ? 22 : 20}
          style={{ whiteSpace: "pre-line" }}
        >
          {heading}
        </Typography>
        {subHeading && (
          <Typography variant='caption' color='GrayText' fontSize={16}>
            {subHeading}
          </Typography>
        )}
        <Typography fontSize={isShowDetails ? 70 : 78} style={{ color: color }}>
          {value}
        </Typography>
      </div>
      {isShowDetails ? (
        <div className='custom-cards-bottom'>
          <Typography fontSize={18} style={{ cursor: "pointer" }} onClick={()=>{
            history.push(link)
          }}>
            View Details
          </Typography>
        </div>
      ) : null}
    </div>
  )
}
