// first red, second green
type labelBgColor = "#FBE4E1" | "#EDFAF6";
type labelTextColor = "#EF887F" | "#60BF9D";

export interface label {
  title: string;
  bgColor: labelBgColor;
  textColor: labelTextColor;
}

export interface IBoardContentSectionCard {
  title: string;
  description: string;
  avatar: string;
  labels: label[];
}

export interface IBoardContentList {
  title: string;
  sectionCards?: IBoardContentSectionCard[];
}
