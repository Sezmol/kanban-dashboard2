import { UniqueIdentifier } from "@dnd-kit/core";

export interface IBoardContentSectionCard {
  id: string;
  title: string;
  description: string;
  parentSection: string;
  avatars: string[];
  labels: string[];
}

export interface IBoardContentList {
  id: UniqueIdentifier;
  title: string;
  emoji: string;
  cards: IBoardContentSectionCard[];
}
