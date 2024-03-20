type TId = string | number;

export interface IBoardContentColumnCard {
  id: TId;
  title: string;
  description: string;
  columnId: TId;
  avatars: string[];
  labels: string[];
}

export interface IBoardContentColumn {
  id: TId;
  title: string;
  emoji: string;
  cards: IBoardContentColumnCard[];
}
