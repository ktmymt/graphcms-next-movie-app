import { gql, GraphQLClient } from "graphql-request"
import { GetServerSideProps, NextPage } from "next"

interface Props {
  videos: any
}

const Home: NextPage<Props> = (props) => {
  console.log(props.videos)
  return <div>Home</div>
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
