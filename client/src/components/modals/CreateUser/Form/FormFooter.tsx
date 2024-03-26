import { Button, Flex } from "antd";
import { IUser } from "../../../../types/UsersTable";

interface FormFooterProps {
  closeModal: () => void;
  isLoading?: boolean;
  isUpdating?: boolean;
  rowData?: IUser | null;
}

const FormFooter = ({
  rowData,
  closeModal,
  isLoading,
  isUpdating,
}: FormFooterProps) => {
  return (
    <Flex justify='flex-end' gap={"1rem"}>
      <Button onClick={closeModal}>Cancel</Button>
      <Button
        loading={isLoading || isUpdating}
        type='primary'
        htmlType='submit'
      >
        {rowData ? "Update" : "Create"}
      </Button>
    </Flex>
  );
};

export default FormFooter;
