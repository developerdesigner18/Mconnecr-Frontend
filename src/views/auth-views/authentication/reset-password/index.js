import React, { useState } from "react";
import LoginForm from "../../components/LoginForm";
import { Card, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const backgroundStyle = {
  backgroundImage: "url(/img/others/login_bg.png)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const ResetPwd = () => {
  const theme = useSelector((state) => state.theme.currentTheme);
  let history = useHistory();
  const [data, setData] = useState();
  const { id } = useParams();
  console.log("props", id);
  const onLogin = (values) => {
    console.log(values);

    // showLoading();
    // signIn(values);
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/resetPassword/${id}`, values)
      .then((response) => {
        console.log(response.data);
        toast(response.data.success);
        setTimeout(() => {
          history.push("/auth/login");
        }, 3000);

        // authenticated(response.data.token);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setData(err.response.data.message);
        setTimeout(() => {
          setData(undefined);
        }, 3000);
      });
  };
  return (
    <div className="h-100" style={backgroundStyle}>
      <div className="container d-flex flex-column justify-content-center h-100">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={7}>
            <Card>
              <div className="my-4">
                <div className="text-center">
                  <img
                    className="img-fluid"
                    src={`/img/others/${
                      theme === "light" ? "logo_dds.png" : "logo_dds_dark.png"
                    }`}
                    // src="/img/others/logo_dds.png"
                    alt=""
                  />
                </div>
                <Form.Item style={{ textAlign: "center", fontWeight: "450" }}>
                  <h3 className="mt-3 text_cliName_pro font-weight-bold ">
                    Reset your Password
                  </h3>
                </Form.Item>

                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form
                      layout="vertical"
                      name="login-form"
                      onFinish={onLogin}
                    >
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password",
                          },
                        ]}
                        style={{ marginBottom: "20px" }}
                      >
                        <Input.Password
                          id="inputID"
                          placeholder="Password"
                          prefix={<LockOutlined className="text-primary" />}
                        />
                      </Form.Item>
                      {data != undefined ? (
                        <div
                          style={{
                            textAlign: "center",
                            color: "red",
                            marginBottom: " 15px",
                            fontWeight: "500",
                          }}
                        >
                          {data}
                        </div>
                      ) : null}
                      <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                          Send
                        </Button>
                      </Form.Item>
                      <ToastContainer />
                    </Form>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ResetPwd;
