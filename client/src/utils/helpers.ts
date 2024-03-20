export const getLabelColor = (label: string) => {
  const labelLowerCase = label.toLowerCase();
  switch (labelLowerCase) {
    case "must":
      return { color: "#EF887F", backgroundColor: "#FBE4E1" };
    case "tiny":
      return { color: "#60BF9D", backgroundColor: "#EDFAF6" };
    case "medium":
      return { color: "#60BF9D", backgroundColor: "#EDFAF6" };
    case "huge":
      return { color: "#60BF9D", backgroundColor: "#EDFAF6" };
    default:
      return {};
  }
};
