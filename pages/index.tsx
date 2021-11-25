import { gql, GraphQLClient } from "graphql-request"
import { GetServerSideProps, NextPage } from "next"
import style from "../styles/app.module.scss"

interface Props {
  videos: any
}

const Home: NextPage<Props> = (props) => {
  return (
    <div className={style.app}>
      <div></div>
      <img src={props.videos[0].thumbnail.url} />
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
