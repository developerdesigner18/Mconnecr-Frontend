import React, { useEffect, useState } from "react";
import { Card, Table, Select, Input, Badge, Menu, Switch } from "antd";
import { Row, Col, Form, Upload, InputNumber } from "antd";
import { useParams } from "react-router-dom";
import Flex from "components/shared-components/Flex";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { DatePicker } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { Option } = Select;

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },

  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }

    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const ProjectAdd = () => {
  let history = useHistory();
  const [dataList, setDataList] = useState("");

  const object = {
    clientName: undefined,
    profileList: undefined,
    assigneeDeveloper: [],
    hireDate: undefined,
    contractName: undefined,
    webLink: undefined,
    discussedBy: [],
    manual: false,
    contractType: false,
    importInfo: [],
    platform: undefined,
    hours: 0,
    cost: 0,
  };
  const [data, setData] = useState(object);
  const fileSelectedHandler = (e, file) => {
    console.log(e.target.files);
    setData({ ...data, importInfo: [...e.target.files] });
  };
  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
    setData({ ...data, hireDate: dateString });
  };
  const handleChange = (e) => {
    if (e.target.name == "hours" || e.target.name == "cost") {
      console.log("hours");

      setData({ ...data, [e.target.name]: parseInt(e.target.value) });
    } else {
      console.log("here");
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };
  const handleChangeClientName = (e) => {
    setData({ ...data, clientName: e });
  };
  const handleChangePlatform = (e) => {
    setData({ ...data, platform: e });
  };
  const handleChangeProfileList = (e) => {
    setData({ ...data, profileList: e });
  };
  const handleChangeDiscuss = (e) => {
    setData({ ...data, discussedBy: e });
  };
  const handleChangeAssignee = (e) => {
    setData({ ...data, assigneeDeveloper: [...e] });
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/client/allClientsName`, {
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
    var formData = new FormData();
    for (const key of Object.keys(data.importInfo)) {
      formData.append("importInfo", data.importInfo[key]);
    }
    formData.append("clientName", data.clientName);
    for (const key of Object.keys(data.assigneeDeveloper)) {
      formData.append("assigneeDeveloper", data.assigneeDeveloper[key]);
    }
    formData.append("contractName", data.contractName);
    formData.append("contractType", data.contractType);
    formData.append("cost", data.cost);
    for (const key of Object.keys(data.discussedBy)) {
      formData.append("discussedBy", data.discussedBy[key]);
    }
    formData.append("hireDate", data.hireDate);
    formData.append("hours", data.hours);
    formData.append("manual", data.manual);
    formData.append("platform", data.platform);
    formData.append("profileList", data.profileList);
    formData.append("webLink", data.webLink);
    axios
      .post(`${process.env.REACT_APP_API_URL}/project/addProject`, formData)
      .then((response) => {
        console.log(response.data);
        toast(response.data.message);

        setTimeout(() => {
          history.push(`/app/projects/ProjectsInfo`);
        }, 3000);
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
        <div>Project's Information</div>
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
            Add new Project
          </Button>
        </div>
      </Flex>
      <div style={{ padding: "20px" }}>
        <Card title="Basic Info">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="clientName" label="Client Name"></Form.Item>
              <Select
                placeholder="Client Name"
                className="w-100"
                name="clientName"
                onChange={(e) => handleChangeClientName(e)}
              >
                {dataList != "" &&
                  dataList.map((data) => {
                    return <Option value={data._id}>{data.clientName}</Option>;
                  })}
              </Select>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="platform" label="Platform"></Form.Item>
              <Select
                placeholder="Select Platform"
                className="w-100"
                name="platform"
                onChange={(e) => handleChangePlatform(e)}
              >
                <Option value="freelancer">freelancer</Option>
                <Option value="upwork">upwork</Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="profileList" label="Profile List"></Form.Item>
              <Select
                placeholder="Profile List"
                className="w-100"
                onChange={(e) => handleChangeProfileList(e)}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="hireDate" label="Hire Date"></Form.Item>
              <DatePicker className="w-100" onChange={onChangeDate} />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="contractName" label="Contract Name"></Form.Item>
              <Input
                className="w-100"
                placeholder="Contract Name"
                name="contractName"
                onChange={(e) => handleChange(e)}
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="websiteLink" label="Website Link"></Form.Item>
              <Input
                className="w-100"
                placeholder="Website Link"
                name="webLink"
                onChange={(e) => handleChange(e)}
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="discussedBy" label="Discussed By"></Form.Item>
              <Select
                placeholder="select Name"
                className="w-100"
                name="discussedBy"
                onChange={(e) => handleChangeDiscuss(e)}
                mode="multiple"
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                name="assigneeDeveloper"
                label="Assignee Developer"
              ></Form.Item>
              <Select
                placeholder="Select Dev Name"
                className="w-100"
                name="assigneeDeveloper"
                onChange={(e) => handleChangeAssignee(e)}
                mode="multiple"
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </Select>
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
              <Form.Item name="manual" label="Manual"></Form.Item>
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                // defaultChecked
                onChange={(event) =>
                  setData({
                    ...data,
                    manual: event,
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
                gap: "5px",
                marginTop: "10px",
              }}
            >
              <Form.Item name="ContractType" label="Contract Type"></Form.Item>
              {/* <div style={{ display: "flex", alignItems: "center" }}> */}
              <span className="text_gray">Fixed</span>
              <Switch
                // defaultChecked={false}
                onChange={(event) =>
                  setData({
                    ...data,
                    contractType: event,
                  })
                }
              />
              <span className="text_gray">Hourly</span>

              <Input
                type="number"
                placeholder="Hours"
                style={{ width: "100%" }}
                name="hours"
                onChange={(e) => handleChange(e)}
              />
              <Input
                type="number"
                placeholder="Cost"
                style={{ width: "100%" }}
                name="cost"
                onChange={(e) => handleChange(e)}
              />
              {/* </div> */}
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="addImportInfo"
                label="Add Import Info"
              ></Form.Item>
              <div
                className="w-100"
                style={{
                  border: "1px solid #DEDEDE",
                  width: "100%",
                  display: "grid",
                  placeItems: "center",
                  padding: "30px 0px",
                  borderRadius: "0.625rem",
                }}
              >
                <input
                  type="file"
                  onChange={(e) => fileSelectedHandler(e)}
                  multiple
                />
                <span className="span_font_upload">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files.
                </span>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProjectAdd;
