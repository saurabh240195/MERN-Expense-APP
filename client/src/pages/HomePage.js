import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Flex,
  Button,
  DatePicker,
  message,
  Table,
} from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/layout/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;
const { Option } = Select;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [frequency, setFrequency] = useState();
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  // TABLE DATA
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => deleteHandle(record)}
          />
        </div>
      ),
    },
  ];
  const submitHandle = async (values) => {
    try {
      // console.log(values);
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (editable) {
        await axios.post("/transections/edit-transection", {
          payload: {
            ...values,
            userID: user._id,
          },
          transectionID: editable._id,
        });
        setLoading(false);
        setShowModal(false);
        messageApi.success("Transection Updated!");
      } else {
        await axios.post("/transections/add-transection", {
          ...values,
          userid: user._id,
        });

        setLoading(false);
        setShowModal(false);
        messageApi.success("Transection Added!");
      }

      setEditable(null);
    } catch (error) {
      setLoading(false);
      messageApi.error("Failed to Add Transection!");
    }
  };

  // Delete Handler
  const deleteHandle = async (record) => {
    try {
      setLoading(true);
      await axios.post("/transections/delete-transection", {
        transectionID: record._id,
      });
      setLoading(false);
      messageApi.success("Transection deleted!");
    } catch (error) {
      setLoading(false);
      console.log(error);
      messageApi.error("Unable to delete Transection!");
    }
  };

  // useEffect hook
  useEffect(() => {
    const getAllTransections = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transections/get-transections", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setAllTransection(res.data.transections || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        messageApi.error("Failed to load Transection!");
      }
    };
    getAllTransections();
  }, [frequency, messageApi, selectedDate, type]);

  return (
    <>
      {contextHolder}
      <Layout>
        {loading && <Spinner />}
        <div className="filters">
          <div>
            <h6>Select Frequency</h6>
            <Select
              value={frequency}
              onChange={(values) => setFrequency(values)}
              placeholder="Select Frequency"
            >
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedDate(values)}
              />
            )}
          </div>
          <div>
            <h6>Select Type</h6>
            <Select
              value={type}
              onChange={(values) => setType(values)}
              placeholder=""
            >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </div>
          <div>
            <UnorderedListOutlined
              className={`mx-2 ${
                viewData === "table" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => {
                setViewData("table");
              }}
            />
            <AreaChartOutlined
              className={`mx-2 ${
                viewData === "analytics" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => {
                setViewData("analytics");
              }}
            />
          </div>
          <div>
            <div className="btn btn-primary" onClick={() => setShowModal(true)}>
              Add New
            </div>
          </div>
        </div>
        <div className="content">
          {viewData === "table" ? (
            <Table columns={columns} dataSource={allTransection} />
          ) : (
            <Analytics allTransection={allTransection} />
          )}
        </div>

        <Modal
          title={editable ? "Edit Transection" : "Add Transection"}
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={false}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{
              ...editable,
              date: editable?.date ? moment(editable.date) : null,
            }}
            onFinish={submitHandle}
            autoComplete="off"
          >
            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                {
                  required: true,
                  message: "Please enter the amount!",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>

            <Form.Item
              name="type"
              label="Type"
              rules={[
                {
                  type: "select",
                },
                {
                  required: true,
                  message: "Please select the income type!",
                },
              ]}
            >
              <Select placeholder="select your income type">
                <Option value="income">Income</Option>
                <Option value="expense">Expense</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  type: "selected",
                },
                {
                  required: true,
                  message: "Please select the category!",
                },
              ]}
            >
              <Select placeholder="select category">
                <Option value="salary">Salary</Option>
                <Option value="freelancing">Freelancing</Option>
                <Option value="electricty-bills">Electricty Bills</Option>
                <Option value="health-insurance">Health Insurance</Option>
                <Option value="movies">Movies</Option>
                <Option value="shopping">Shopping</Option>
                <Option value="food">Food</Option>
              </Select>
            </Form.Item>

            <Form.Item name="refrence" label="Refrence">
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Please enter the description!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item name="date" label="Date">
              <DatePicker />
            </Form.Item>

            <Form.Item>
              <Flex justify="space-between" align="center">
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
                <Link to="/login">Already Register? Click here to login.</Link>
              </Flex>
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    </>
  );
};

export default HomePage;
