import { gql } from '@apollo/client';

const postFragment = gql `
  fragment PostFragment on Post {
    id
    title
    short_description
    user {
      profile_photo
    }
  }
`

export const GET_POSTS = gql`
  query getAllPosts {
    posts {
      ...PostFragment
    }
  }
  ${postFragment}
`;


export const POST_SUBSCRİPTİON = gql`
  subscription {
    postCreated {
      ...PostFragment
    }
  }
  ${postFragment}
`;


export const POST_COUNT_SUBSCRIPTION = gql`
subscription {
  postCount
}
`;