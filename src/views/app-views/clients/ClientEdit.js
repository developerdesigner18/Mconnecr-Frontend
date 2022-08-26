import React, { useEffect, useState } from "react";
import { Card, Table, Select, Input, Button, Badge, Menu, Switch } from "antd";
import { Row, Col, Form, Upload, InputNumber, message } from "antd";
import { useParams } from "react-router-dom";
import Flex from "components/shared-components/Flex";
import axios from "axios";
import validator from "validator";
import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ClientEdit = () => {
  const { id } = useParams();
  console.log("props", id);
  let history = useHistory();
  const object = {
    clientName: undefined,
    country: undefined,
    countryTimeZone: undefined,
    decord: undefined,
    discordPassword: undefined,
    discordUsername: undefined,
    emailAddress: undefined,
    mobileNo: undefined,
    platform: undefined,
    server: undefined,
    skypeId: undefined,
    slack: undefined,
    slackPassword: undefined,
    slackUsername: undefined,
    whatsappNumber: undefined,
    workspace: undefined,
  };
  const [data, setData] = useState(object);
  const [emailError, setEmailError] = useState("");
  const [dataList, setDataList] = useState("");
  const handleChange = (e) => {
    console.log(e.target.name, "chek");
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onDiscard = () => {
    setData("");
    history.push(`/app/clients/ClientsInfo`);
  };
  const handleChangeEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError("");
      setData({ ...data, [e.target.name]: e.target.value });
    } else {
      setEmailError("Enter valid Email!");
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/client/showSingleClient/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        setDataList(res.data.data);

        console.log(res.data.data).catch((err) => {
          console.log(err.res.data.message);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onLogin = () => {
    console.log(data);
    const objectLogin = {
      clientName:
        data.clientName != undefined ? data.clientName : dataList?.clientName,
      country: data.country != undefined ? data.country : dataList?.country,
      countryTimeZone:
        data.countryTimeZone != undefined
          ? data.countryTimeZone
          : dataList?.countryTimeZone,
      decord: data.decord != undefined ? data.decord : dataList?.decord,
      discordPassword:
        data.discordPassword != undefined
          ? data.discordPassword
          : dataList?.discordPassword,
      discordUsername:
        data.discordUsername != undefined
          ? data.discordUsername
          : dataList?.discordUsername,
      email:
        data.emailAddress != undefined ? data.emailAddress : dataList?.email,
      mobileNo: data.mobileNo != undefined ? data.mobileNo : dataList?.mobileNo,
      platform: data.platform != undefined ? data.platform : dataList?.platform,
      server: data.server != undefined ? data.server : dataList?.server,
      skypeId: data.skypeId != undefined ? data.skypeId : dataList?.skypeId,
      slack: data.slack != undefined ? data.slack : dataList?.slack,
      slackPassword:
        data.slackPassword != undefined
          ? data.slackPassword
          : dataList?.slackPassword,
      slackUsername:
        data.slackUsername != undefined
          ? data.slackUsername
          : dataList?.slackUsername,
      whatsappNumber:
        data.whatsappNumber != undefined
          ? data.whatsappNumber
          : dataList?.whatsappNumber,
      workspace:
        data.workspace != undefined ? data.workspace : dataList?.workspace,
    };
    axios
      .post(`http://localhost:8000/client/editClient/${id}`, objectLogin, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast(response.data.message);

        setTimeout(() => {
          history.push(`/app/clients/ClientsInfo`);
        }, 3000);
        // authenticated(response.data.token);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setData(err.response.data.message);
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
        <div>Client's Information</div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4%",
          }}
        >
          <Button onClick={onDiscard} type="primary" className="discard_btn">
            Discard
          </Button>
          <Button onClick={onLogin} type="primary">
            save
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
                  defaultValue={
                    dataList?.clientName ? dataList?.clientName : ""
                  }
                  name="clientName"
                  onChange={(e) => handleChange(e)}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="platform" label="Platform"></Form.Item>
                <Input
                  className="w-100"
                  name="platform"
                  defaultValue={dataList?.platform ? dataList?.platform : ""}
                  onChange={(e) => handleChange(e)}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="country" label="Country"></Form.Item>
                <Input
                  className="w-100"
                  name="country"
                  defaultValue={dataList?.country ? dataList?.country : ""}
                  onChange={(e) => handleChange(e)}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="countryTimeZone"
                  label="Country Time Zone"
                ></Form.Item>
                <Input
                  className="w-100"
                  name="countryTimeZone"
                  defaultValue={
                    dataList?.countryTimeZone ? dataList?.countryTimeZone : ""
                  }
                  onChange={(e) => handleChange(e)}
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
                    name="skypeId"
                    defaultValue={dataList?.skypeId ? dataList?.skypeId : ""}
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="mobileNo" label="Mobile Number"></Form.Item>
                  <Input
                    name="mobileNo"
                    className="w-100"
                    defaultValue={dataList?.mobileNo ? dataList?.mobileNo : ""}
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="whatsappNumber"
                    label="Whatsapp Number"
                  ></Form.Item>
                  <Input
                    className="w-100"
                    name="whatsappNumber"
                    defaultValue={
                      dataList?.whatsappNumber ? dataList?.whatsappNumber : ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="emailAddress"
                    label="Email Address"
                  ></Form.Item>
                  <Input
                    className="w-100"
                    name="emailAddress"
                    defaultValue={dataList?.email ? dataList?.email : ""}
                    onChange={(e) => handleChangeEmail(e)}
                  />
                  {emailError != "" && (
                    <div style={{ color: "red" }}>{emailError}</div>
                  )}
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
                    defaultChecked={dataList?.slack ? dataList?.slack : false}
                    onChange={(event) =>
                      setData({
                        ...data,
                        slack: event,
                      })
                    }
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
                    defaultChecked={dataList?.decord ? dataList?.decord : false}
                    onChange={(event) =>
                      setData({
                        ...data,
                        decord: event,
                      })
                    }
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
                    name="workspace"
                    defaultValue={
                      dataList?.workspace ? dataList?.workspace : ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="slackUsername"
                    label="Slack Username"
                  ></Form.Item>

                  <Input
                    className="w-100"
                    name="slackUsername"
                    defaultValue={
                      dataList?.slackUsername ? dataList?.slackUsername : ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="slackPassword"
                    label="Slack Password"
                  ></Form.Item>
                  <Input
                    className="w-100"
                    name="slackPassword"
                    defaultValue={
                      dataList?.slackPassword ? dataList?.slackPassword : ""
                    }
                    onChange={(e) => handleChange(e)}
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
                    defaultValue={dataList?.server ? dataList?.server : ""}
                    name="server"
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="discordUsername"
                    label="Discord Username"
                  ></Form.Item>
                  <Input
                    className="w-100"
                    defaultValue={
                      dataList?.discordUsername ? dataList?.discordUsername : ""
                    }
                    name="discordUsername"
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="discordPassword"
                    label="Discord Password"
                  ></Form.Item>
                  <Input
                    className="w-100"
                    name="discordPassword"
                    defaultValue={
                      dataList?.discordPassword ? dataList?.discordPassword : ""
                    }
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ClientEdit;
