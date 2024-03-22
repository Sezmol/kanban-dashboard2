import { gql } from "@apollo/client";

export const GET_ALL_BOARD_CARDS = gql`
  query GetAllCards {
    cards {
      avatars
      id
      title
      labels
      description
      columnId
    }
  }
`;
