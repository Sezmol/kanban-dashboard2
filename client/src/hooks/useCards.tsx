import { useMutation, useQuery } from "@apollo/client";
import { ICardsData } from "../types/BoardContent";
import { GET_ALL_BOARD_CARDS } from "../graphql/boardCards/query";
import {
  PUBLISH_BOARD_CARD,
  UPDATE_BOARD_CARD,
} from "../graphql/boardCards/mutation";

const useCards = () => {
  const { data: cardsData, loading } =
    useQuery<ICardsData>(GET_ALL_BOARD_CARDS);
  const [updateCard] = useMutation(UPDATE_BOARD_CARD);
  const [publishCard] = useMutation(PUBLISH_BOARD_CARD);

  return {
    cardsData,
    loading,
    updateCard,
    publishCard,
  };
};

export default useCards;
