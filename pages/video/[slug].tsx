import { gql, GraphQLClient } from "graphql-request"
import { GetServerSideProps, NextPage } from "next"

interface Props {
  video: any
}

const Video: NextPage<Props> = (props) => {
  console.log(props.video)
  return <div></div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = process.env.ENDPOINT
  const graphqlClient = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  })

  const slug = context.query.slug

  const query = gql`
    query ($slug: String!) {
      video(where: { slug: $slug }) {
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

  const variables = {
    slug,
  }

  const data = await graphqlClient.request(query, variables)
  const video = data.video

  return {
    props: {
      video: video,
    },
  }
}

export default Video
