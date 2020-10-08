import React from "react"
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share"

export default function Share({ title, url }) {
  function getRndInteger(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min) / 10
  }
  return (
    <div className="share">
      <FacebookShareButton quote={title} url={url}>
        <div className="shareBox">
          <FacebookIcon size={32} round={false} />
          <div className="fbshareBox">
            <span className="count">{getRndInteger(1, 100)}k</span>
            <span className="shares">shares</span>
          </div>
        </div>
      </FacebookShareButton>
      <TwitterShareButton title={title} url={url}>
        <div className="shareBox">
          <TwitterIcon size={32} round={false} />
          <div className="fbshareBox">
            <span className="count">{getRndInteger(1, 100)}k</span>
            <img
              src="https://images.ctfassets.net/9qx0z62w952c/57dl46NgSzIGJfCi1voT9Y/20e90a729347aaecf22de560ccbb243e/retweet.svg"
              style={{ width: "20px", opacity: 0.7 }}
            />
          </div>
        </div>
      </TwitterShareButton>
      <WhatsappShareButton title={title} url={url}>
        <div className="shareBox">
          <WhatsappIcon size={32} round={false} />
          <div className="fbshareBox">
            <span className="count">{getRndInteger(1, 100)}k</span>
            <span className="shares">shares</span>
          </div>
        </div>
      </WhatsappShareButton>
    </div>
  )
}
