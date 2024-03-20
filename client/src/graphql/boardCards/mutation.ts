import { gql } from "@apollo/client";

export const ADD_BOARD_CARD = gql`
  mutation CreateBoardCard(
    $title: String!
    $description: String!
    $columnId: String!
    $avatars: Json
    $labels: Json
  ) {
    createCard(
      data: {
        title: $title
        avatars: $avatars
        description: $description
        labels: $labels
        columnId: $columnId
      }
    ) {
      id
    }
  }
`;

export const PUBLISH_BOARD_CARD = gql`
  mutation PublishBoardCard($id: ID!) {
    publishCard(where: { id: $id }) {
      id
    }
  }
`;

export const DELETE_BOARD_CARD = gql`
  mutation DeleteBoardCard($id: ID!) {
    deleteCard(where: { id: $id }) {
      id
    }
  }
`;

export const UPDATE_BOARD_CARD = gql`
  mutation UpdateCard($columnId: String!, $id: ID!) {
    updateCard(data: { columnId: $columnId }, where: { id: $id }) {
      id
    }
  }
`;
