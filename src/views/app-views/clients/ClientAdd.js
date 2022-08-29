import React, { useEffect, useState, useMemo } from "react";
import { Card, Table, Select, Input, Button, Badge, Menu, Switch } from "antd";
import { Row, Col, Form, Upload, InputNumber, message } from "antd";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Flex from "components/shared-components/Flex";
import validator from "validator";
import NumberFormat from "react-number-format";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import TimezoneSelect from "react-timezone-select";
import countryList from "react-select-country-list";
const ClientAdd = () => {
  const { Option } = Select;
  let history = useHistory();
  const { id } = useParams();
  // console.log("props", id);
  const object = {
    clientName: undefined,
    country: undefined,
    countryTimeZone: undefined,
    decord: undefined,
    discordPassword: undefined,
    discordUsername: undefined,
    email: undefined,
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
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [data, setData] = useState(object);
  const [emailError, setEmailError] = useState("");
  const [err, setErr] = useState("");
  const [platform, setPlatform] = useState("");
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/platform/allPlatform`)
      .then((res) => {
        setPlatform(res.data.data);

        console.log(res.data.data.clientName).catch((err) => {
          console.log(err.res.data.message);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangePlatform = (e) => {
    setData({ ...data, platform: e });
  };
  const changeHandleCountry = (value, label) => {
    console.log(label.label);
    setData({ ...data, country: label.label });
  };

  const onSearch = (value) => {
    // console.log("search:", value);
  };

  const changeHandleSelectedTimezone = (value, e) => {
    console.log(value.label, e, selectedTimezone);
    setData({ ...data, countryTimeZone: value.label });
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

  const onDiscard = () => {
    setData("");
    history.push(`/app/clients/ClientsInfo`);
  };
  const onLogin = () => {
    console.log(data);
    if (
      data.clientName != undefined &&
      data.country != undefined &&
      data.platform != undefined &&
      data.countryTimeZone != undefined
    ) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/client/addClient`, data)
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
          //  setTimeout(() => {
          //    setData(undefined);
          //  }, 3000);
        });
    } else {
      setErr("Please fill required fields");
      setTimeout(() => {
        setErr("");
      }, 5000);
    }
  };
  return (
    <Form
    // layout="vertical"
    // name="login-form"
    // initialValues={initialCredential}
    // onFinish={onLogin}
    >
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
            <Button type="primary" onClick={onDiscard} className="discard_btn">
              Discard
            </Button>
            <Button type="primary" onClick={onLogin}>
              Add new client
            </Button>
          </div>
        </Flex>
        <div style={{ padding: "20px" }}>
          <Card title="Basic Info">
            {err != undefined ? (
              <div
                style={{
                  color: "red",
                  marginBottom: " 15px",
                  fontWeight: "500",
                }}
              >
                {err}
              </div>
            ) : null}
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  className="ant-form-item-required"
                  name="clientName"
                  label="Client Name"
                  id="clientName"
                  rules={[{ required: true }]}
                ></Form.Item>

                <Input
                  placeholder="Client Name"
                  name="clientName"
                  className="w-100"
                  onChange={(e) => handleChange(e)}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="platform"
                  label="Platform"
                  rules={[{ required: true }]}
                ></Form.Item>

                <Select
                  placeholder="Select Platform"
                  className="w-100"
                  showSearch
                  onChange={(e) => handleChangePlatform(e)}
                  rules={[{ required: true }]}
                >
                  {platform != "" &&
                    platform.map((data) => {
                      return (
                        <Option
                          value={data.name}
                          style={{ textTransform: "capitalize" }}
                        >
                          {data.name}
                        </Option>
                      );
                    })}
                </Select>
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="country"
                  label="Country"
                  rules={[{ required: true }]}
                >
                  {" "}
                </Form.Item>
                {/* <Input
                  className="w-100"
                  name="country"
                  onChange={(e) => handleChange(e)}
                /> */}
                <Select
                  showSearch
                  className="w-100"
                  placeholder="Select Country"
                  options={options}
                  onChange={changeHandleCountry}
                  value={data.country}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="countryTimeZone"
                  label="Country Time Zone"
                  rules={[{ required: true }]}
                ></Form.Item>
                {/* <Input
                  className="w-100"
                  name="countryTimeZone"
                  onChange={(e) => handleChange(e)}
                /> */}
                <TimezoneSelect
                  styles={{ borderRadius: "10px" }}
                  value={selectedTimezone}
                  onChange={(e) => changeHandleSelectedTimezone(e)}
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
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item name="mobileNo" label="Mobile Number"></Form.Item>
                  {/* <Input
                    className="w-100"
                    name="mobileNo"
                    onChange={(e) => handleChange(e)}
                  /> */}
                  <NumberFormat
                    format="(###) ###-####"
                    mask="_"
                    className="w-100 numFormat"
                    name="mobileNo"
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="whatsappNumber"
                    label="Whatsapp Number"
                  ></Form.Item>
                  {/* <Input
                    className="w-100"
                    name="whatsappNumber"
                    onChange={(e) => handleChange(e)}
                  /> */}
                  <NumberFormat
                    format="(###) ###-####"
                    mask="_"
                    className="w-100 numFormat"
                    name="whatsappNumber"
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    name="emailAddress"
                    label="Email Address"
                  ></Form.Item>

                  <Input
                    type="email"
                    className="w-100"
                    name="email"
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
                    // name="slack"
                    onChange={(event) =>
                      setData({
                        ...data,
                        slack: event,
                      })
                    }
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    // defaultChecked
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
                    // name="discord"
                    onChange={(event) => setData({ ...data, decord: event })}
                    checkedChildren="Yes"
                    unCheckedChildren="No"
                    // defaultChecked
                  />
                </Col>
              </Row>
            </Card>
          </div>
          {data.slack == true ? (
            <div style={{ marginTop: "20px" }}>
              <Card title="Slack Info">
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item name="workspace" label="Workspace"></Form.Item>
                    <Input
                      className="w-100"
                      onChange={(e) => handleChange(e)}
                      name="workspace"
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      name="slackUsername"
                      label="Slack Username"
                    ></Form.Item>
                    <Input
                      className="w-100"
                      onChange={(e) => handleChange(e)}
                      name="slackUsername"
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      name="slackPassword"
                      label="Slack Password"
                    ></Form.Item>
                    <Input
                      className="w-100"
                      onChange={(e) => handleChange(e)}
                      name="slackPassword"
                    />
                  </Col>
                </Row>
              </Card>
            </div>
          ) : null}
          {data.decord == true ? (
            <div style={{ marginTop: "20px" }}>
              <Card title="Discord Info">
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item name="server" label="Server"></Form.Item>
                    <Input
                      className="w-100"
                      onChange={(e) => handleChange(e)}
                      name="server"
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      name="discordUsername"
                      label="Discord Username"
                    ></Form.Item>
                    <Input
                      className="w-100"
                      onChange={(e) => handleChange(e)}
                      name="discordUsername"
                    />
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <Form.Item
                      name="discordPassword"
                      label="Discord Password"
                    ></Form.Item>
                    <Input
                      className="w-100"
                      onChange={(e) => handleChange(e)}
                      name="discordPassword"
                    />
                  </Col>
                </Row>
              </Card>
            </div>
          ) : null}

          {/* <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item> */}
        </div>
      </div>
      <ToastContainer />
    </Form>
  );
};

export default ClientAdd;
