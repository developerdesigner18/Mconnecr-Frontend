import React, { useEffect, useState } from "react";
import { Card, Table, Select, Input, Button, Badge, Menu, Switch } from "antd";
import { Row, Col, Form, Upload, InputNumber, message } from "antd";
import { useParams } from "react-router-dom";
import Flex from "components/shared-components/Flex";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ClientView = () => {
  let history = useHistory();

  const { id } = useParams();
  console.log("props", id);
  const [dataList, setDataList] = useState("");

  const editDetails = (row) => {
    // history.push(`/app/apps/ecommerce/edit-product/${row.id}`);
    console.log(row);
    history.push(`/app/clients/ClientEdit/${row}`);
  };
  useEffect(() => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/client/showSingleClient/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        setDataList(res.data.data);

        console.log(res.data.data.clientName).catch((err) => {
          console.log(err.res.data.message);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(dataList.clientName, "datalist");
  return (
    <div>
      <Flex
        alignItems="center"
        justifyContent="between"
        mobileFlex={false}
        className="client_info_title_edit"
      >
        <div>Client's Information</div>
        <div>
          <Button onClick={() => editDetails(id)} type="primary">
            Edit
          </Button>
        </div>
      </Flex>
      {dataList != "" && (
        <div style={{ padding: "20px" }}>
          <Card title="Basic Info">
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="clientName" label="Client Name"></Form.Item>
                <Input
                  className="w-100"
                  value={dataList?.clientName ? dataList?.clientName : ""}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="platform" label="Platform"></Form.Item>
                <Input
                  className="w-100"
                  value={dataList?.platform ? dataList?.platform : ""}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="country" label="Country"></Form.Item>
                <Input
                  className="w-100"
                  value={dataList?.country ? dataList?.country : ""}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="countryTimeZone"
                  label="Country Time Zone"
                ></Form.Item>
                <Input
                  className="w-100"
                  value={
                    dataList?.countryTimeZone ? dataList?.countryTimeZone : ""
                  }
                />
              </Col>
            </Row>
          </Card>

          <div style={{ marginTop: "20px" }}>
            <Card title="Contact Info">
              <Row gutter={16}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="skypeId" label="Skype ID"></Form.Item>
                  <Input
                    className="w-100"
                    value={dataList?.skypeId ? dataList?.skypeId : ""}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="mobileNo" label="Mobile Number"></Form.Item>
                  <Input
                    className="w-100"
                    value={dataList?.mobileNo ? dataList?.mobileNo : ""}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="whatsappNumber"
                    label="Whatsapp Number"
                  ></Form.Item>
                  <Input
                    className="w-100"
                    value={
                      dataList?.whatsappNumber ? dataList?.whatsappNumber : ""
                    }
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="emailAddress"
                    label="Email Address"
                  ></Form.Item>
                  <Input
                    className="w-100"
                    value={dataList?.email ? dataList?.email : ""}
                  />
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Item name="slack" label="Slack"></Form.Item>
                  <Switch
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    checked={dataList?.slack ? dataList?.slack : false}
                    // defaultChecked=
                  />
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Item name="discord" label="Discord"></Form.Item>
                  <Switch
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    checked={dataList?.decord ? dataList?.decord : false}
                  />
                </Col>
              </Row>
            </Card>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Card title="Slack Info">
              <Row gutter={16}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="workspace" label="Workspace"></Form.Item>
                  <Input
                    className="w-100"
                    value={dataList?.workspace ? dataList?.workspace : ""}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="slackUsername"
                    label="Slack Username"
                  ></Form.Item>

                  <Input
                    className="w-100"
                    value={
                      dataList?.slackUsername ? dataList?.slackUsername : ""
                    }
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="slackPassword"
                    label="Slack Password"
                  ></Form.Item>
                  <Input
                    className="w-100"
                    value={
                      dataList?.slackPassword ? dataList?.slackPassword : ""
                    }
                  />
                </Col>
              </Row>
            </Card>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Card title="Discord Info">
              <Row gutter={16}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="server" label="Server"></Form.Item>

                  <Input
                    className="w-100"
                    value={dataList?.server ? dataList?.server : ""}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="discordUsername"
                    label="Discord Username"
                  ></Form.Item>
                  <Input
                    className="w-100"
                    value={
                      dataList?.discordUsername ? dataList?.discordUsername : ""
                    }
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="discordPassword"
                    label="Discord Password"
                  ></Form.Item>
                  <Input
                    className="w-100"
                    value={
                      dataList?.discordPassword ? dataList?.discordPassword : ""
                    }
                  />
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientView;
