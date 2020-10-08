import React from "react"

function TogglBtn({ openNav, nav }) {
  return (
    <div onClick={openNav} className={nav ? "bars toggle" : "bars"}>
      <div className="line1" />
      <div className="line2" />
      <div className="line3" />
    </div>
  )
}

export default TogglBtn
