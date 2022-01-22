import React from "react"
import Image from "next/image"
import { Video } from "../types/Video"
import style from "../styles/app.module.scss"

interface Props {
  video: Video
}

const Card = (props: Props) => {
  return (
    <div className={style.card}>
      <Image
        className={style.card}
        src={props.video.thumbnail.url}
        alt={props.video.title}
        width="280px"
        height="160px"
      />
    </div>
  )
}

export default Card
