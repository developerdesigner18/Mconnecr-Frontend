import React, { Component } from "react";
import { Form, Button, Input, Row, Col, message } from "antd";
import validator from "validator";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export class ChangePassword extends Component {
  changePasswordFormRef = React.createRef();
  //   history = this.useHistory();
  constructor(props) {
    super(props);
    this.state = { data: undefined };
  }

  onSubmit = (values) => {
    // message.success({ content: 'Password Changed!', duration: 2 });
    // this.onReset()
    console.log(values);
    if (
      validator.isStrongPassword(values.newPassword, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      const objectData = {
        newPassword: values.newPassword,
        password: values.currentPassword,
      };
      axios
        .post(
          `${
            process.env.REACT_APP_API_URL
          }/api/changePwd/${localStorage.getItem("user_id")}`,
          objectData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          toast(response.data.message);
          setTimeout(() => {
            this.props.history.push("/");
          }, 3000);
        })
        .catch((err) => {
          console.log(err.response.data.message, this.state.data);
          this.setState({
            data: err.response.data.message,
          });
          setTimeout(() => {
            this.setState({
              data: undefined,
            });
          }, 3000);
        });
    } else {
      console.log("no");
    }
  };

  onReset = () => {
    this.changePasswordFormRef.current.resetFields();
  };

  render() {
    return (
      <>
        <h2 className="mb-4">Change Password</h2>
        <Row>
          <Col xs={24} sm={24} md={24} lg={8}>
            <Form
              name="changePasswordForm"
              layout="vertical"
              ref={this.changePasswordFormRef}
              onFinish={(values) => this.onSubmit(values)}
            >
              <Form.Item
                label="Current Password"
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter your currrent password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Password not matched!");
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              {this.state.data != undefined ? (
                <div
                  style={{
                    color: "red",
                    marginBottom: " 15px",
                    marginTop: " 15px",
                    fontWeight: "500",
                  }}
                >
                  {this.state.data}
                </div>
              ) : null}
              <Button type="primary" htmlType="submit">
                Change password
              </Button>
              <ToastContainer />
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(ChangePassword);
