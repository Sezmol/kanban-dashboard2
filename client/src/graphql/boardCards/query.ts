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

export const GET_BOARD_CARDS = gql`
  query boardCards($columnId: String!) {
    boardCards(where: { columnId: $columnId }) {
      title
      description
      avatars
      labels
      id
      columnId
    }
  }
`;
