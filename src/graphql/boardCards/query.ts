import { gql } from "@apollo/client";

export const GET_BOARD_CARDS = gql`
  query boardCards {
    boardCards {
      id
      title
      sectionCards
    }
  }
`;
