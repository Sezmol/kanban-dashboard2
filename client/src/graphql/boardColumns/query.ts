import { gql } from "@apollo/client";

export const GET_ALL_BOARD_COLUMNS = gql`
  query GetAllColumns {
    columns {
      id
      title
      emoji
      cards {
        id
        description
        labels
        parentSection
        title
        avatars
      }
    }
  }
`;
