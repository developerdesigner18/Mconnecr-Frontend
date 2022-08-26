import React, { useState } from "react";
import LoginForm from "../../components/LoginForm";
import { Card, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const backgroundStyle = {
  backgroundImage: "url(/img/others/login_bg.png)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const ForgotPwd = () => {
  const theme = useSelector((state) => state.theme.currentTheme);
  const [data, setData] = useState();
  const onLogin = (values) => {
    console.log(values);

    // showLoading();
    // signIn(values);
    axios
      .post("http://localhost:8000/auth/forgotpassword", values)
      .then((response) => {
        console.log(response.data);
        toast(response.data.message);
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
                    Forgot Password?
                  </h3>
                  <p className="mb-4 ">Enter your Email to reset password</p>
                </Form.Item>

                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form
                      layout="vertical"
                      name="login-form"
                      onFinish={onLogin}
                    >
                      <Form.Item
                        name="email"
                        // label="Email"

                        style={{ marginBottom: "20px" }}
                      >
                        <Input
                          id="inputID"
                          placeholder="Email"
                          // onChange={() => handleEmail(e)}
                          prefix={<MailOutlined className="text-primary" />}
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

export default ForgotPwd;
