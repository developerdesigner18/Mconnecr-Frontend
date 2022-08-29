import React, { useEffect, useState } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import moment from "moment";
import {
  Switch,
  Radio,
  Button,
  Row,
  Col,
  Tooltip,
  Tag,
  Progress,
  Avatar,
  Menu,
  Card,
} from "antd";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ProjectListData from "./ProjectListData";
import {
  BookOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  EditOutlined,
  SyncOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  UserAddOutlined,
  FormOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import utils from "utils";
import { COLORS } from "constants/ChartConstant";
import Flex from "components/shared-components/Flex";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { useHistory } from "react-router-dom";

import { SearchOutlined } from "@ant-design/icons";

import { Select, Input } from "antd";
import axios from "axios";
const { Option } = Select;
const ItemHeader = ({ clientName, category, platform }) => (
  <div>
    <h4 className="mb-0 header_cat_project">{category}</h4>
    <div style={{ display: "flex" }}>
      <span
        className="text_cliName_pro"
        style={{ textTransform: "capitalize" }}
      >
        {clientName.clientName} -{" "}
      </span>
      <span className="text_cliPlat_pro">&nbsp;{platform}</span>
    </div>
  </div>
);
const members = [
  {
    name: "Troy Alexander",
    img: "",
    avatarColor: "red",
  },
  {
    name: "Lloyd Obrien",
    img: "/img/avatars/thumb-11.jpg",
    avatarColor: "",
  },
];
const ItemInfo = ({ name, date, statusColor, dayleft }) => (
  <Flex alignItems="center">
    <div className="">
      <Tooltip title="name" className="text_cliPlat_pro">
        <UserOutlined className="text_cliPlat_pro font-size-md" />
        <span className="ml-1 text_cliPlat_pro">{name}&nbsp;</span>
      </Tooltip>
    </div>
    <div className="">
      <Tooltip title="date">
        <CalendarOutlined className="text_cliPlat_pro font-size-md" />
        <span className="ml-1 text_cliPlat_pro" style={{ fontSize: "12px" }}>
          {moment(date).format("Do MMM YYYY")}&nbsp;
        </span>
      </Tooltip>
    </div>
    <div>
      <Tag
        className={statusColor === "none" ? "bg-gray-lightest" : ""}
        color={statusColor !== "none" ? statusColor : ""}
      >
        <ClockCircleOutlined />
        <span className="ml-2 font-weight-semibold">{dayleft} days left</span>
      </Tag>
    </div>
  </Flex>
);
const getProgressStatusColor = (progress) => {
  if (progress >= 80) {
    return COLORS[1];
  }
  if (progress < 60 && progress > 30) {
    return COLORS[3];
  }
  if (progress < 30) {
    return COLORS[2];
  }
  return COLORS[0];
};
const ItemProgress = ({ progression }) => (
  <Progress
    percent={progression}
    strokeColor={getProgressStatusColor(progression)}
    size="small"
  />
);

const ItemMember = ({ member }) => (
  <>
    {member.map((elm, i) =>
      i <= 2 ? (
        <Tooltip title={elm.name} key={`avatar-${i}`}>
          <Avatar
            size="small"
            className={`ml-1 cursor-pointer ant-avatar-${elm.avatarColor}`}
            src={elm.img}
          >
            {elm.img ? (
              ""
            ) : (
              <span className="font-weight-semibold font-size-sm">
                {utils.getNameInitial(elm.name)}
              </span>
            )}
          </Avatar>
        </Tooltip>
      ) : null
    )}
    {member.length > 3 ? (
      <Tooltip title={`${member.length - 3} More`}>
        <Avatar
          size={25}
          className="ml-1 cursor-pointer bg-white border font-size-sm"
        >
          <span className="text-gray-light font-weight-semibold">
            +{member.length - 3}
          </span>
        </Avatar>
      </Tooltip>
    ) : null}
    <Tooltip>
      <Avatar
        size="small"
        className={`ml-1 cursor-pointer ant-avatar border_Ellipsis`}
        src=""
        alt="rt"
      >
        <span className="font-weight-semibold font-size-sm">
          <EllipsisOutlined />
        </span>
      </Avatar>
    </Tooltip>
  </>
);
const ItemAction = ({ id, removeId }) => (
  <EllipsisDropdown
    menu={
      <Menu>
        <Menu.Item key="0">
          <UserAddOutlined />
          <span>Add Developers</span>
        </Menu.Item>
        <Menu.Item key="1">
          <SyncOutlined />
          <span>Change Status</span>
        </Menu.Item>
        <Menu.Item key="2">
          <FormOutlined />
          <span>End Contract</span>
        </Menu.Item>
        <Menu.Item key="2">
          <ExclamationCircleOutlined />
          <span>Change limit</span>
        </Menu.Item>
        <Menu.Item key="2">
          <BookOutlined />
          <span>Manual</span>&nbsp;
          <Switch defaultChecked />
        </Menu.Item>
      </Menu>
    }
  />
);
const GridItem = ({ data, removeId }) => (
  <Card>
    <Flex alignItems="center" justifyContent="between">
      <ItemHeader
        clientName={data.clientName}
        category={data.contractName}
        platform={data.platform}
      />
      <ItemAction id={data.id} removeId={removeId} />
    </Flex>
    <div className="mt-2">
      <ItemInfo
        name={data.discussedBy[0]}
        date={data.hireDate}
        // statusColor={data.statusColor}
        dayleft="21"
      />
    </div>
    <div className="mt-3">
      <ItemProgress progression="90" />
    </div>
    <div className="mt-2">
      <ItemMember member={members} />
    </div>
  </Card>
);
const ProjectsInfo = () => {
  let history = useHistory();
  const categories = ["Upwork", "Freelancer"];
  // const [list, setList] = useState(ProjectListData);
  const deleteItem = (id) => {
    const data = list.filter((elm) => elm.id !== id);
    setList(data);
  };
  const addProject = () => {
    history.push(`/app/projects/ProjectAdd`);
  };
  const [list, setList] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/project/allProjects`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        setList(res.data.data);

        console.log(res.data).catch((err) => {
          console.log(err.res.data.message);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="client_info_title">Project's Information</div>
      <Flex
        alignItems="center"
        justifyContent="between"
        mobileFlex={false}
        className="header_clientInfo"
      >
        <div className="mb-1">
          <div className="mr-md-3 mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              //   onChange={(e) => onSearch(e)}
            />
          </div>
          <div className="mb-3">
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              //   onChange={handleShowCategory}
              placeholder="Category"
            >
              <Option value="All">All</Option>
              {categories.map((elm) => (
                <Option key={elm} value={elm}>
                  {elm}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <Button onClick={addProject} type="primary" block>
            Add new Project
          </Button>
        </div>
      </Flex>
      <div className="grid_project_main" style={{ marginTop: "-25px" }}>
        <div className="my-4 container-fluid">
          <Row gutter={16} style={{ rowGap: "16px", paddingBottom: "20px" }}>
            {list != "" &&
              list.map((elm) => (
                <Col xs={24} sm={24} lg={8} xl={8} xxl={6} key={elm.id}>
                  <GridItem data={elm} removeId={(id) => deleteItem(id)} />
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ProjectsInfo;
