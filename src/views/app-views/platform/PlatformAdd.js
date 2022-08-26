import React, { useState } from "react";

import { Card, Table, Select, Input, Button, Badge, Menu, Switch } from "antd";
import { Row, Col, Form, Upload, InputNumber, message } from "antd";
import { useParams } from "react-router-dom";
import Flex from "components/shared-components/Flex";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { DatePicker } from "antd";
const { Option } = Select;

const DevelopersAdd = () => {
  const { id } = useParams();
  console.log("props", id);
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
  };
  const object = {
    name: undefined,
  };

  const [data, setData] = useState(object);
  const handleChange = (e) => {
    console.log("name:", e.target.name, "value:", e.target.value);

    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onLogin = () => {
    axios
      .post(" http://localhost:8000/platform/addPlatform", data)
      .then((response) => {
        console.log(response.data);
        toast(response.data.message);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div>
      <Flex
        alignItems="center"
        justifyContent="between"
        mobileFlex={false}
        className="client_info_title_edit"
      >
        <div>Platform Information</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4%",
          }}
        >
          <Button
            // onClick={addProduct}
            type="primary"
            className="discard_btn"
          >
            Discard
          </Button>
          <Button onClick={onLogin} type="primary">
            Add new Platform
          </Button>
        </div>
      </Flex>
      <div style={{ padding: "20px" }}>
        <Card title="Basic Info">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="platform" label="Platform's"></Form.Item>
              <Input
                className="w-100"
                placeholder="Platform"
                name="name"
                onChange={(e) => handleChange(e)}
              />
            </Col>
          </Row>
        </Card>
        <ToastContainer />
      </div>
    </div>
  );
};

export default DevelopersAdd;
