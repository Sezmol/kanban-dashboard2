import { gql } from "@apollo/client";

export const ADD_BOARD_CARD = gql`
  mutation MyMutation(
    $title: String!
    $description: String!
    $parentSection: String!
    $avatars: Json
    $labels: Json
  ) {
    createBoardCard(
      data: {
        title: $title
        avatars: $avatars
        description: $description
        labels: $labels
        parentSection: $parentSection
      }
    ) {
      id
    }
  }
`;