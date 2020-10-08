import React, { useEffect } from "react"

const GoogleAd = () => {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.log(err)
    }
  }, [])
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-1063328225356164"
      data-ad-slot="2406104394"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  )
}

export default GoogleAd
