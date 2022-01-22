import { gql, GraphQLClient } from "graphql-request"
import { GetServerSideProps, NextPage } from "next"
import Image from "next/image"
import Section from "../components/Section"
import { Video } from "../types/Video"
import style from "../styles/app.module.scss"

interface Props {
  videos: any
}

const Home: NextPage<Props> = (props) => {
  const randomVideo = (videos: Video[]) => {
    return videos[Math.floor(Math.random() * videos.length)]
  }

  const filterVideo = (videos: Video[], genre: string) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  const unseenVideo = (videos: Video[]) => {
    return videos.filter((video) => video.seen == false || video.seen == null)
  }

  return (
    <div className={style.app}>
      <div className={style.mainVideo}>
        <Image
          src={randomVideo(props.videos).thumbnail.url}
          alt={randomVideo(props.videos).title}
          layout="fill"
        />
      </div>
      <div>
        <Section
          genre="Recommended for you"
          videos={unseenVideo(props.videos)}
        />
        <Section genre="drama" videos={filterVideo(props.videos, "drama")} />
        <Section
          genre="thriller"
          videos={filterVideo(props.videos, "thriller")}
        />
        <Section
          genre="animals"
          videos={filterVideo(props.videos, "animals")}
        />
        <Section genre="comedy" videos={filterVideo(props.videos, "comedy")} />
        <Section genre="family" videos={filterVideo(props.videos, "family")} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const url = process.env.ENDPOINT
  const graphqlClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  })

  const query = gql`
    query {
      videos {
        id
        title
        description
        seen
        slug
        tags
        thumbnail {
          url
        }
        mp4 {
          url
        }
      }
    }
  `

  const data = await graphqlClient.request(query)

  return {
    props: {
      videos: data.videos,
    },
  }
}

export default Home
