// first red, second green
type labelBgColor = "#FBE4E1" | "#EDFAF6";
type labelTextColor = "#EF887F" | "#60BF9D";

export interface IBoardContentSectionCard {
  title: string;
  description: string;
  parentSection: string;
  avatars: string[];
  labels: string[];
}

export interface IBoardContentList {
  title: string;
  emoji: string;
}
