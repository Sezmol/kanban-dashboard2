import { gql } from "@apollo/client";

export const GET_ALL_BOARD_CARDS = gql`
  query allBoardsCards {
    boardCards {
      title
      description
      avatars
      labels
      id
      parentSection
    }
  }
`;

export const GET_BOARD_CARDS = gql`
  query boardCards($parentSection: String!) {
    boardCards(where: { parentSection: $parentSection }) {
      title
      description
      avatars
      labels
      id
      parentSection
    }
  }
`;
