import React from "react"
import Link from "next/link"
import Card from "./Card"
import { Video } from "../types/Video"
import style from "../styles/app.module.scss"

interface Props {
  genre: string
  videos: Video[]
}

const Section = (props: Props) => {
  return (
    <div className={style.section}>
      <h3>{props.genre}</h3>
      <div className={style.videoFeed}>
        {props.videos.map((video) => (
          <Link key={video.id} href={`/video/${video.slug}`}>
            <a>
              <Card video={video} />
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Section
