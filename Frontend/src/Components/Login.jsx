import React from 'react'

import { Button, Modal, Row, Col, Form, Input } from 'antd'


import {toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"


const Login = ({ modalState, handleCloseModal }) => {

  const onFinish = async (value) => {
    axios.post("http://localhost:3000/login", value)
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
        handleCloseModal()
      })
      .catch(e => console.log(e))
  }

  return (
    <Modal
      width={500}
      title='Log in'
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
            name={'email'}
            label='Email'
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name={'password'}
            label='Password'
            rules={[{ required: true }]}
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
  )
}

export default Login