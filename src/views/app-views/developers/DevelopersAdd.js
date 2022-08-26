import React, { useEffect, useState } from "react";

import { Card, Table, Select, Input, Button, Badge, Menu, Switch } from "antd";
import { Row, Col, Form, Upload, InputNumber, message } from "antd";
import { useParams } from "react-router-dom";
import Flex from "components/shared-components/Flex";
import { UploadOutlined } from "@ant-design/icons";

import { DatePicker } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { Option } = Select;

const DevelopersAdd = () => {
  const { id } = useParams();
  const [TL, setTL] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:8000/developer/devTL`)
      .then((res) => {
        setTL(res.data.data);

        console.log(res.data.data.clientName).catch((err) => {
          console.log(err.res.data.message);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log("props", id);
  const object = {
    name: undefined,
    joinDate: undefined,
    position: undefined,
    dob: undefined,
    department: undefined,
    TL: undefined,
    bond: false,
    years: 0,
    months: 0,
    address: undefined,
    email: undefined,
    number: 0,
    ENumber: 0,
    ddsEmail: undefined,
    ddsPwd: undefined,
    ddsSlackEmail: undefined,
    ddsSlackPwd: undefined,
    devAdharCardNum: undefined,
    devPanCardNum: undefined,
    adharImgF: [],
    adharImgB: [],
    panImg: [],
  };

  const [data, setData] = useState(object);
  const [err, setErr] = useState("");

  const onChangeDateDob = (date, dateString) => {
    setData({ ...data, dob: dateString });
  };
  const handleChangePosition = (e) => {
    setData({ ...data, position: e });
  };
  const handleChangeDepart = (e) => {
    setData({ ...data, department: e });
  };
  const handleChangeTL = (e) => {
    setData({ ...data, TL: e });
  };
  const onChangeDate = (date, dateString) => {
    setData({ ...data, joinDate: dateString });
  };
  const fileSelectedHandler = (e) => {
    console.log(e.target.files[0]);
    setData({ ...data, [e.target.name]: e.target.files[0] });
  };
  const handleChange = (e) => {
    console.log("name:", e.target.name, "value:", e.target.value);
    // setData({ ...data, [e.target.name]: e.target.value });
    if (
      e.target.name == "ENumber" ||
      e.target.name == "number" ||
      e.target.name == "years" ||
      e.target.name == "months"
    ) {
      console.log("hours");

      setData({ ...data, [e.target.name]: parseInt(e.target.value) });
    } else {
      console.log("here");
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };
  const onLogin = () => {
    console.log(data);
    if (data.adharImgB != "" && data.adharImgF != "" && data.panImg != "") {
      console.log("yes");
      var formData = new FormData();
      if (data.department != [] && data.department != undefined) {
        console.log("yes", data.department);
        for (const key of Object.keys(data.department)) {
          formData.append("department", data.department[key]);
        }
      } else {
        console.log("no");
      }

      formData.append("name", data.name);
      formData.append("joinDate", data.joinDate);
      formData.append("position", data.position);
      formData.append("dob", data.dob);
      formData.append("TL", data.TL);
      formData.append("bond", data.bond);
      formData.append("years", data.years);
      formData.append("months", data.months);
      formData.append("address", data.address);
      formData.append("email", data.email);
      formData.append("number", data.number);
      formData.append("ENumber", data.ENumber);
      formData.append("ddsEmail", data.ddsEmail);
      formData.append("ddsPwd", data.ddsPwd);
      formData.append("ddsSlackEmail", data.ddsSlackEmail);
      formData.append("ddsSlackPwd", data.ddsSlackPwd);
      formData.append("devAdharCardNum", data.devAdharCardNum);
      formData.append("devPanCardNum", data.devPanCardNum);
      formData.append("adharImgF", data.adharImgF);
      formData.append("adharImgB", data.adharImgB);
      formData.append("panImg", data.panImg);
      axios
        .post("http://localhost:8000/developer/addDev", formData)
        .then((response) => {
          console.log(response.data);
          toast(response.data.message);
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      console.log("no");
      setErr("Please select image");
      setTimeout(() => {
        setErr(" ");
      }, 3000);
    }
  };
  return (
    <div>
      <Flex
        alignItems="center"
        justifyContent="between"
        mobileFlex={false}
        className="client_info_title_edit"
      >
        <div>Developer's Information</div>
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
            Add new Developer
          </Button>
        </div>
      </Flex>
      <div style={{ padding: "20px" }}>
        <Card title="Basic Info">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item label="Name"></Form.Item>

              <Input
                className="w-100"
                onChange={(e) => handleChange(e)}
                name="name"
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="dateOfJoin" label="Date of Join"></Form.Item>
              <DatePicker
                className="w-100"
                onChange={onChangeDate}
                placeholder="Select Date Of Join"
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="position" label="Position"></Form.Item>
              <Select
                placeholder="Select Position"
                className="w-100"
                onChange={(e) => handleChangePosition(e)}
              >
                <Option value="Traniee">Traniee </Option>
                <Option value="Permanent developer">Permanent developer</Option>
                <Option value="SEO">SEO</Option>
                <Option value="CTO">CTO</Option>
                <Option value="Designer">Designer</Option>
                <Option value="TL">TL</Option>
                <Option value="Digital Marketer">Digital Marketer</Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="dateOfBirth" label="Date Of Birth"></Form.Item>
              <DatePicker
                className="w-100"
                onChange={onChangeDateDob}
                placeholder="Select Date Of Birth"
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="department" label="Department"></Form.Item>
              {/* <Input className="w-100" placeholder="Select Department" /> */}
              <Select
                placeholder="Select Department"
                className="w-100"
                onChange={(e) => handleChangeDepart(e)}
                mode="multiple"
              >
                <Option value="Mern stack">Mern stack</Option>
                <Option value="Shopify">Shopify</Option>
                <Option value="Flutter">Flutter</Option>
                <Option value="React native">React native</Option>
                <Option value="Mean stack">Mean stack</Option>
                <Option value="Laravel">Laravel</Option>
                <Option value="BDE">BDE</Option>
                <Option value="PHP">PHP</Option>
                <Option value="Python">Python</Option>
                <Option value="Wordpress">Wordpress</Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="teamLeader" label="Team Leader"></Form.Item>
              <Select
                placeholder="Select Team Leader"
                className="w-100"
                onChange={(e) => handleChangeTL(e)}
                disabled={
                  data.position == "SEO" ||
                  data.position == "CTO" ||
                  data.position == "TL"
                    ? true
                    : false
                }
              >
                {TL != "" &&
                  TL.map((data) => {
                    return <Option value={data.name}>{data.name}</Option>;
                  })}
              </Select>
            </Col>

            <Col
              xs={24}
              sm={24}
              md={12}
              style={{
                display: "flex",
                marginTop: "15px",
                alignItems: "center",
                justifyContent: "space-between",
                // gap: "20px",
              }}
            >
              <Form.Item name="bond" label="Bond"></Form.Item>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                // defaultChecked
                onChange={(event) =>
                  setData({
                    ...data,
                    bond: event,
                  })
                }
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  gap: "5px",
                  width: "50%",
                }}
              >
                <Input
                  placeholder="Years"
                  style={{ width: "100%" }}
                  name="years"
                  type="number"
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  placeholder="Months"
                  style={{ width: "100%" }}
                  name="months"
                  type="number"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </Col>
          </Row>
        </Card>
        <div style={{ marginTop: "20px" }}>
          <Card title="Contact Info">
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="address" label="Address"></Form.Item>
                <Input
                  className="w-100"
                  placeholder="Address"
                  name="address"
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
                  // type="email"
                  placeholder="Email Address"
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item name="number" label="Contact Number"></Form.Item>
                <Input
                  className="w-100"
                  placeholder="Contact Number"
                  name="number"
                  type="number"
                  onChange={(e) => handleChange(e)}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="emergency"
                  label="Emergency Contact Number"
                ></Form.Item>
                <Input
                  className="w-100"
                  placeholder="Emergency Contact Number"
                  name="ENumber"
                  type="number"
                  onChange={(e) => handleChange(e)}
                />
              </Col>
            </Row>
          </Card>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Card title="Company Info">
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="ddsEmailAddress"
                  label="Daydreamsoft Email Address"
                ></Form.Item>
                <Input
                  className="w-100"
                  placeholder="Daydreamsoft Email Address"
                  name="ddsEmail"
                  onChange={(e) => handleChange(e)}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="ddsEmailPwd"
                  label="Daydreamsoft Email Password"
                ></Form.Item>
                <Input
                  className="w-100"
                  placeholder="Daydreamsoft Email Password"
                  name="ddsPwd"
                  onChange={(e) => handleChange(e)}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="ddsSlackEmailAddress"
                  label="Daydreamsoft Slack Email Address"
                ></Form.Item>
                <Input
                  className="w-100"
                  placeholder="Daydreamsoft Slack Email Address"
                  type="email"
                  name="ddsSlackEmail"
                  onChange={(e) => handleChange(e)}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="ddsSlackEmailPwd"
                  label="Daydreamsoft Slack Email Password"
                ></Form.Item>
                <Input
                  className="w-100"
                  placeholder="Daydreamsoft Slack Email Password"
                  name="ddsSlackPwd"
                  onChange={(e) => handleChange(e)}
                />
              </Col>
            </Row>
          </Card>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Card title="Developers Personal Info">
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="developersAdharCardNumber"
                  label="Developers Adhar Card Number"
                ></Form.Item>
                <Input
                  className="w-100"
                  placeholder="Developers Adhar Card Number"
                  name="devAdharCardNum"
                  onChange={(e) => handleChange(e)}
                />
              </Col>
              <Col xs={24} sm={24} md={12}>
                <Form.Item
                  name="developersPancardNumber"
                  label="Developers Pancard Number"
                ></Form.Item>
                <Input
                  className="w-100"
                  placeholder="Developers Pancard Number"
                  name="devPanCardNum"
                  onChange={(e) => handleChange(e)}
                />
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <Form.Item
                  name="uploadAdharFrontPhoto"
                  label="Upload Adhar Card Front Side Photo"
                ></Form.Item>
                <input
                  type="file"
                  name="adharImgF"
                  onChange={(e) => fileSelectedHandler(e)}
                />
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <Form.Item
                  name="uploadPancardPhoto"
                  label="Upload Pancard Photo"
                ></Form.Item>
                <input
                  type="file"
                  name="panImg"
                  onChange={(e) => fileSelectedHandler(e)}
                />
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <Form.Item
                  name="uploadAdharBackPhoto"
                  label="Upload Adhar Card Back Side Photo"
                ></Form.Item>
                <input
                  type="file"
                  name="adharImgB"
                  onChange={(e) => fileSelectedHandler(e)}
                />
              </Col>
            </Row>
            {err != "" && <div style={{ color: "red" }}>{err}</div>}
          </Card>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DevelopersAdd;
