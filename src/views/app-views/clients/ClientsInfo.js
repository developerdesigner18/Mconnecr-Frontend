import React, { useEffect, useState } from "react";
import { Card, Table, Select, Input, Button, Badge, Menu } from "antd";
import ProductListData from "assets/data/clientsInfo-list.data.json";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import AvatarStatus from "components/shared-components/AvatarStatus";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import utils from "utils";
import swal from "sweetalert";

import axios from "axios";

const { Option } = Select;

const getStockStatus = (stockCount) => {
  if (stockCount >= 10) {
    return (
      <>
        <Badge status="success" />
        <span>In Stock</span>
      </>
    );
  }
  if (stockCount < 10 && stockCount > 0) {
    return (
      <>
        <Badge status="warning" />
        <span>Limited Stock</span>
      </>
    );
  }
  if (stockCount === 0) {
    return (
      <>
        <Badge status="error" />
        <span>Out of Stock</span>
      </>
    );
  }
  return null;
};

const categories = ["Upwork", "Freelancer"];

const ClientsInfo = () => {
  let history = useHistory();
  const [platform, setPlatform] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/client/allClients`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      })
      .then((res) => {
        setList(res.data.data);
        setDataList(res.data.data);

        console.log(res.data).catch((err) => {
          console.log(err.res.data.message);
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/platform/allPlatform`)
      .then((res) => {
        setPlatform(res.data.data);

        console.log(res.data.data).catch((err) => {
          console.log(err.res.data.message);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [list, setList] = useState();
  const [dataList, setDataList] = useState();
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => viewDetails(row)}>
        <Flex alignItems="center">
          <EyeOutlined />
          <span className="ml-2">View Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => editDetails(row)}>
        <Flex alignItems="center">
          <EditOutlined />
          <span className="ml-2">Edit Details</span>
        </Flex>
      </Menu.Item>
      <Menu.Item onClick={() => deleteRow(row)}>
        <Flex alignItems="center">
          <DeleteOutlined />
          <span className="ml-2">
            {selectedRows.length > 0
              ? `Delete (${selectedRows.length})`
              : "Delete"}
          </span>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  const addProduct = () => {
    history.push(`/app/clients/ClientAdd`);
  };

  const viewDetails = (row) => {
    // history.push(`/app/apps/ecommerce/edit-product/${row.id}`);
    console.log(row);
    history.push(`/app/clients/ClientView/${row}`);
  };
  const editDetails = (row) => {
    // history.push(`/app/apps/ecommerce/edit-product/${row.id}`);
    console.log(row);
    history.push(`/app/clients/ClientEdit/${row}`);
  };
  const deleteRow = (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this client!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((deleteState) => {
      if (deleteState) {
        console.log(selectedRowKeys, "checking");
        if (selectedRows.length > 0) {
          selectedRowKeys.map((id) => {
            axios
              .delete(
                `${process.env.REACT_APP_API_URL}/client/deleteClient/${id}`
              )
              .then((res) => {
                console.log(res.data);
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
                alert(error.response.data.message);
              });

            swal("Clients are successfully deleted", {
              icon: "success",
            });
          });

          // } else if (selectedRows.length > 0) {
        } else {
          axios
            .delete(
              `${process.env.REACT_APP_API_URL}/client/deleteClient/${id}`
            )
            .then((res) => {
              console.log(res.data);
              window.location.reload();
            })
            .catch((error) => {
              console.log(error);
              alert(error.response.data.message);
            });

          swal("Client is successfully deleted", {
            icon: "success",
          });
        }
      } else {
        swal("Your file is safe!");
      }
    });
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "clientName",
      sorter: (a, b) => utils.antdTableSorter(a, b, "clientName"),
      render: (text) => (
        <div className="text-left" style={{ textTransform: " capitalize" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Platform",
      dataIndex: "platform",

      sorter: (a, b) => utils.antdTableSorter(a, b, "platform"),
      render: (text) => (
        <div className="text-left" style={{ textTransform: " capitalize" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      sorter: (a, b) => utils.antdTableSorter(a, b, "country"),
      render: (text) => (
        <div className="text-left" style={{ textTransform: " capitalize" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Time Zone",
      dataIndex: "countryTimeZone",

      sorter: (a, b) => utils.antdTableSorter(a, b, "countryTimeZone"),
      render: (text) => (
        <div className="text-left" style={{ textTransform: " capitalize" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Skype ID",
      dataIndex: "skypeId",
      sorter: (a, b) => utils.antdTableSorter(a, b, "skypeId"),
      render: (text) => (
        <div className="text-left" style={{ textTransform: " capitalize" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Number",
      dataIndex: "mobileNo",

      sorter: (a, b) => utils.antdTableSorter(a, b, "mobileNo"),
    },
    {
      title: "",
      dataIndex: "_id",
      render: (id) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(id)} />
        </div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (key, rows) => {
      setSelectedRows(rows);
      setSelectedRowKeys(key);
      console.log(selectedRows, selectedRowKeys);
    },
  };

  const onSearch = (e) => {
    const value = e.currentTarget.value;
    const data = dataList.filter((data) => {
      return data.clientName.toLowerCase().includes(value.toLowerCase());
    });

    setList(data);
    setSelectedRowKeys([]);
  };

  const handleShowCategory = (value) => {
    console.log(value, "hhh");
    if (value !== "All") {
      const key = "platform";
      // console.log(value.toLowerCase());
      // const data = utils.filterArray(
      //   dataList,
      //   key,
      //   value.toLowerCase()
      // );
      const data = dataList.filter((data) => {
        return data.platform.toLowerCase() == value.toLowerCase();
      });
      setList(data);
    } else {
      setList(dataList);
    }
  };

  return (
    <div>
      <div className="client_info_title">Client's Information</div>
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
              onChange={(e) => onSearch(e)}
            />
          </div>
          <div className="mb-3">
            <Select
              defaultValue="All"
              className="w-100"
              style={{ minWidth: 180 }}
              onChange={handleShowCategory}
              placeholder="Category"
            >
              <Option value="All">All</Option>
              {platform != "" &&
                platform.map((elm) => (
                  <Option key={elm._id} value={elm.name}>
                    {elm.name}
                  </Option>
                ))}
            </Select>
          </div>
        </div>
        <div>
          <Button onClick={addProduct} type="primary" block>
            Add new client
          </Button>
        </div>
      </Flex>
      <div className="table-responsive">
        <Table
          columns={tableColumns}
          dataSource={list}
          rowKey="_id"
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            type: "checkbox",
            preserveSelectedRowKeys: false,
            ...rowSelection,
          }}
        />
      </div>
    </div>
  );
};

export default ClientsInfo;
