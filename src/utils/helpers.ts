export const getLabelColor = (label: string) => {
  switch (label) {
    case "Must":
      return {
        color: "#EF887F",
        backgroundColor: "#FBE4E1",
      };
    case "Tiny":
      return { color: "#60BF9D", backgroundColor: "#EDFAF6" };
    case "Medium":
      return { color: "#60BF9D", backgroundColor: "#EDFAF6" };
    case "Huge":
      return { color: "#60BF9D", backgroundColor: "#EDFAF6" };
    default:
      return {};
  }
};
