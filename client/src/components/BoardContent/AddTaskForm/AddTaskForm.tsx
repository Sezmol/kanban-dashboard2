import { useMutation } from "@apollo/client";
import { Button, Card, Form, Input, Select, SelectProps } from "antd";
import {
  ADD_BOARD_CARD,
  PUBLISH_BOARD_CARD,
} from "../../../graphql/boardCards/mutation";
import { GET_ALL_BOARD_CARDS } from "../../../graphql/boardCards/query";
import { ICardsData } from "../../../types/BoardContent";

type Inputs = {
  title: string;
  description: string;
  labels: string[];
};

interface IAddTaskFormProps {
  handleCancel: () => void;
  columnId: string | number;
}

const options: SelectProps["options"] = [
  {
    label: "Must",
    value: "must",
  },
  {
    label: "Tiny",
    value: "tiny",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Huge",
    value: "huge",
  },
];

const AddTaskForm = ({ handleCancel, columnId }: IAddTaskFormProps) => {
  const [addTask, { loading }] = useMutation(ADD_BOARD_CARD, {
    update(cache, { data: cardData }) {
      const cardsData: ICardsData | null = cache.readQuery({
        query: GET_ALL_BOARD_CARDS,
      });

      if (cardsData && cardData) {
        cache.writeQuery({
          query: GET_ALL_BOARD_CARDS,
          data: {
            cards: [...cardsData.cards, cardData.createCard],
          },
        });
      }
    },
  });

  const [publishTask, { loading: isPublishing }] =
    useMutation(PUBLISH_BOARD_CARD);

  const onFinish = async (values: Inputs) => {
    const avatar =
      "https://s3-alpha-sig.figma.com/img/9b85/6681/7f96cbb879ede778e41ec951fffd675a?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PQSdLkrNhrrhJ9C6aXN3BIaEMNgAh7aEM5KGPk7U12jMGYrcj8kLp3qAR13N2jvIqp8Bt7HuhgFbksxuhQZPKreuwyXbZP7Xa8ehdn4KPas0T6pSP45djsgtKdHp4dZCTdVwHIH349DOo0HZz-lNWZ7KE2-GZLCd1Nr4iVVrARtySaFqDMiUqo~DL6EI4fR2DYmnsz8uaM1hyDSvxax2b8AFJmN5nzOFsdoGk2CxYm~OUvfVA3X3Y8kBX4yJNxfDK2KPDEtYt-OzUjI92i8vivCFTqI0DdOkLObKbm3WpipfUFfEnPkUlKtYgzTnlwPHjq4-2ZegqkL9Vikh1XczMA__";

    const newTask = {
      title: values.title,
      description: values.description,
      columnId: columnId,
      avatars: [avatar],
      labels: values.labels || [],
    };

    try {
      const result = await addTask({ variables: { ...newTask } });
      if (!result) {
        throw new Error("Error while creating card");
      }

      const id = result.data?.createCard?.id;
      if (id) {
        handleCancel();
        await publishTask({ variables: { id } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <Form
        onFinish={onFinish}
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "1rem",
        }}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter a title",
            },
          ]}
          validateTrigger='onBlur'
          name='title'
        >
          <Input placeholder='Task title' />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter a description",
            },
          ]}
          validateTrigger='onBlur'
          name='description'
        >
          <Input.TextArea placeholder='Task description' />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              message: "At least one label is required",
            },
          ]}
          validateTrigger='onBlur'
          name='labels'
        >
          <Select
            mode='multiple'
            allowClear
            placeholder='Please select labels'
            maxCount={3}
            options={options}
          />
        </Form.Item>

        <Button
          htmlType='submit'
          style={{ backgroundColor: "#6e6af0" }}
          type='primary'
          loading={loading || isPublishing}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
        <Button
          onClick={handleCancel}
          style={{ backgroundColor: "#ef887f" }}
          type='primary'
          disabled={loading || isPublishing}
        >
          Cancel
        </Button>
      </Form>
    </Card>
  );
};

export default AddTaskForm;
