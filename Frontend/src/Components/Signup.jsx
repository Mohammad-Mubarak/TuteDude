import React from 'react'
import { passwordValidation } from '../Helper/util'
import { Button, Modal, Row, Col, Form, Input } from 'antd'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Signup = ({ modalState, handleCloseModal }) => {
  const navigate = useNavigate()

  const onFinish = (value) => {
    console.log('Data coming', value)
    axios.post("http://localhost:3000/signup", value)
      .then(val => {
        const notify = () => toast.success(`👍 ${val.data.message} !`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })

        if (val.data.token) {
          localStorage.setItem("token", JSON.stringify(val.data.token))
          localStorage.setItem("user", JSON.stringify(val.data.user))
        } 

        notify()
      })
      .catch(e => console.log(e))

    handleCloseModal()
    navigate("/")
  }

  return (
    <>
      <Modal
        width={500}
        title='Sign Up'
        bodyStyle={{ border: '1px solid #eaeaee', borderRadius: '10px' }}
        open={modalState}
        footer={[]}
        destroyOnClose
        onCancel={() => {
          handleCloseModal()
        }}
      >
        <br />
        <br />
        <Row justify={'center'}>
          <Form
            layout='vertical'
            onFinish={onFinish}
            style={{ width: '90%' }}
          >
            <Form.Item
              name={'name'}
              label='Name'
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'email'}
              label='Email'
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              name={'password'}
              label='Password'
              validateTrigger={['onChange', 'onBlur']}
              rules={[
                {
                  required: true,
                  validator: (_, value) => {
                    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
                    const newErrors = []

                    if (value && value.length < 6) {
                      newErrors.push(passwordValidation.passwordLengthValidation)
                    }

                    if (!/[A-Z]/.test(value)) {
                      newErrors.push(passwordValidation.passwordCapitalLetterValidation)
                    }

                    if (!/[a-z]/.test(value)) {
                      newErrors.push(passwordValidation.passwordSmallLetterValidation)
                    }

                    if (!/[!@#$%^&*]/.test(value)) {
                      newErrors.push(passwordValidation.passwordSpecialCharacterValidation)
                    }

                    if (!/\d/.test(value)) {
                      newErrors.push(passwordValidation.passwordDigitValidation)
                    }

                    if (newErrors.length > 0) {
                      return Promise.reject(newErrors)
                    }

                    if (pattern.test(value)) {
                      return Promise.resolve()
                    } else {
                      return Promise.reject(['Invalid password format.'])
                    }
                  },
                },
              ]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>
            <br />

            <Row justify={'center'}>
              <Col>
                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    size='large'
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Row>
      </Modal>





      {/* Notification for form  */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />

    </>
  )
}

export default Signup