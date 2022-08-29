import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { GoogleSVG, FacebookSVG } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";
import {
  signIn,
  showLoading,
  showAuthMessage,
  hideAuthMessage,
  signInWithGoogle,
  signInWithFacebook,
} from "redux/actions/Auth";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const LoginForm = (props) => {
  let history = useHistory();

  const {
    otherSignIn,
    showForgetPassword,
    hideAuthMessage,
    onForgetPasswordClick,
    showLoading,
    signInWithGoogle,
    signInWithFacebook,
    extra,
    signIn,
    token,
    loading,
    redirect,
    showMessage,
    message,
    allowRedirect,
  } = props;

  // const initialCredential = {
  //   email: "user1@themenate.net",
  //   password: "2005ipo",
  // };
  const [data, setData] = useState();
  const onLogin = (values) => {
    console.log(
      values,
      process.env.REACT_APP_API_URL,
      "hellooooooooooooo wpkljuiuio"
    );
    // showLoading();
    // signIn(values);
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signin`, values)
      .then((response) => {
        console.log(response.data.token);
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("user_id", response.data.username_id);
        toast("Successfully Login");
        setTimeout(() => {
          window.location.reload();
        }, 3000);

        // authenticated(response.data.token);
      })
      .catch((err) => {
        setData(err.response.data.message);
        setTimeout(() => {
          setData(undefined);
        }, 3000);
      });
  };

  const onGoogleLogin = () => {
    showLoading();
    signInWithGoogle();
  };

  const onFacebookLogin = () => {
    showLoading();
    signInWithFacebook();
  };

  useEffect(() => {
    if (token !== null && allowRedirect) {
      history.push(redirect);
    }
    if (showMessage) {
      setTimeout(() => {
        hideAuthMessage();
      }, 3000);
    }
  });

  // const renderOtherSignIn = (
  //   <div>
  //     <Divider>
  //       <span className="text-muted font-size-base font-weight-normal">
  //         or connect with
  //       </span>
  //     </Divider>
  //     <div className="d-flex justify-content-center">
  //       <Button
  //         onClick={() => onGoogleLogin()}
  //         className="mr-2"
  //         disabled={loading}
  //         icon={<CustomIcon svg={GoogleSVG} />}
  //       >
  //         Google
  //       </Button>
  //       <Button
  //         onClick={() => onFacebookLogin()}
  //         icon={<CustomIcon svg={FacebookSVG} />}
  //         disabled={loading}
  //       >
  //         Facebook
  //       </Button>
  //     </div>
  //   </div>
  // );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: showMessage ? 1 : 0,
          marginBottom: showMessage ? 20 : 0,
        }}
      >
        <Alert type="error" showIcon message={message}></Alert>
      </motion.div>
      <Form
        layout="vertical"
        name="login-form"
        // initialValues={initialCredential}
        onFinish={onLogin}
      >
        <Form.Item
          name="email"
          // label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
            {
              type: "email",
              message: "Please enter a validate email!",
            },
          ]}
          style={{ marginBottom: "20px" }}
        >
          <Input
            id="inputID"
            placeholder="Email"
            prefix={<MailOutlined className="text-primary" />}
          />
        </Form.Item>
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
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign In
          </Button>
        </Form.Item>
        {/* {otherSignIn ? renderOtherSignIn : null}
        {extra} */}
        <Form.Item
          style={{ textAlign: "center", fontWeight: "450", cursor: "pointer" }}
          onClick={() => history.push(`/auth/forgot-password1`)}
        >
          Forgot Password?
        </Form.Item>
        <ToastContainer />
      </Form>
    </>
  );
};

LoginForm.propTypes = {
  otherSignIn: PropTypes.bool,
  showForgetPassword: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

LoginForm.defaultProps = {
  otherSignIn: true,
  showForgetPassword: false,
};

const mapStateToProps = ({ auth }) => {
  const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect };
};

const mapDispatchToProps = {
  signIn,
  showAuthMessage,
  showLoading,
  hideAuthMessage,
  signInWithGoogle,
  signInWithFacebook,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
