import { Flex } from "antd";
import { getLabelColor } from "../../../../utils/helpers";

const Label = ({ label }: { label: string }) => (
  <Flex
    align='center'
    justify='center'
    style={{
      ...getLabelColor(label),
      width: "3.75rem",
      height: "1.5rem",
      borderRadius: "10px",
      fontSize: "0.625rem",
      fontWeight: 500,
      textTransform: "capitalize",
    }}
  >
    {label}
  </Flex>
);

export default Label;
