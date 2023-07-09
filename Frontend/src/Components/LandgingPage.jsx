import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HeartFilled,
  CloseOutlined,
  BookOutlined,
} from "@ant-design/icons"
import { Button, Layout, Menu, theme, Input, Drawer } from "antd"
import { useState, useRef, useEffect, useContext } from "react"
import styled from "styled-components"
import { ProductContext } from "../Helper/Context"
import axios from "axios"
import Signup from "./Signup"
import Login from "./Login"
import { useNavigate } from 'react-router-dom'
import { Outlet } from "react-router-dom"
import { useCreateModalState } from "../Helper/util"
const { Header, Sider, Content } = Layout


function LandingPage() {
  const { searchText, setSearchText, setAllBooks} = useContext(ProductContext)
  let user = localStorage.getItem("user")
  const [userloggedIn, setUserloggedIn] = useState(user)
  const [collapsed, setCollapsed] = useState(true)
  const [open, setOpen] = useState(false)


  
  const navigate = useNavigate()

  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const signupModal = useCreateModalState()
  const loginModal = useCreateModalState()


  
  const handleMenuClick = (e) => {
    // Handle menu item click based on the key
    if (e.key === "1") {
      // Handle Favourites menu item click
      console.log("Favourites clicked")
    } else if (e.key === "2") {
      // Handle Books menu item click
      axios.get('http://localhost:3000/allbooks')
        .then(response => {
          setAllBooks(response.data)
        })
        navigate("/")
         console.log("Books clicked")
    }
  }

  function logoutUser() {
    axios.get(`http://localhost:3000/logout`)
    localStorage.clear()
    setUserloggedIn(true)
  }

  function dataSearchGet() {
    axios.get(`http://localhost:3000/search/${searchText}`)
      .then(response => {
        setAllBooks(response.data)
      })
  }


  useEffect(() => {
    axios.get('http://localhost:3000/allbooks')
      .then(response => {
        setAllBooks(response.data)
      })
      .catch(error => {
        console.error('Error:', error)
      })
    if (searchText !== "") {
      dataSearchGet()
    }
  }, [searchText])

  return (
    <Layout>
      <span className="sider1">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            borderRight: "1px solid #ede6e6",
            zIndex: 2,
          }}
        >
          <Menu theme="dark" mode="inline" onClick={handleMenuClick}>
            <Menu.Item key="1" icon={<HeartFilled />} label="Favourites">
              Favourites
            </Menu.Item>
            <Menu.Item key="2" icon={<BookOutlined />} label="Books">
              Books
            </Menu.Item>
          </Menu>
        </Sider>
      </span>

      <span className="drawer">
        <Drawer
          placement="left"
          closable={false}
          open={open}
          onClose={() => setOpen(false)}
          width={200}
          bodyStyle={{ backgroundColor: "#140e24" }}
        >
          <CloseOutlined
            style={{
              color: "white",
              position: "absolute",
              right: 10,
              top: 10,
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => setOpen(false)} />
          <Sider
            style={{
              overflow: "auto",
              marginTop: "30px",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
              borderRight: "1px solid #ede6e6",
              zIndex: 2,
            }}
          >
            <Menu theme="dark" mode="inline" onClick={handleMenuClick}>
              <Menu.Item key="1" icon={<HeartFilled />} label="Favourites">
                Favourites
              </Menu.Item>
              <Menu.Item key="2" icon={<BookOutlined />} label="Books">
                Books
              </Menu.Item>
            </Menu>
          </Sider>
        </Drawer>
      </span>
      <Layout
        className={`site-layout`}
        style={{
          marginLeft: collapsed ? "5rem" : "200px",
        }}
      >
        <StyledHeader
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }} />

          <SearchBox
            placeholder="Search here..."
            value={searchText}
            allowClear={true}
            onChange={(e) => setSearchText(e.target.value)} />

          <GroupedButton>
            {
              user ? <Button style={{background:"red",color:"white"}}
                onClick={() => {
                  logoutUser()
                }}
              >
                logout
              </Button> : <>
                <Button
                style={{background:"green",color:"white"}}
                  onClick={() => {
                    loginModal.openModal()
                  }}
                >
                  Login
                </Button>
                <Button
                   style={{background:"blue",color:"white"}}
                  onClick={() => {
                    signupModal.openModal()
                  }}
                >
                  Signup
                </Button>
              </>
            }

          </GroupedButton>
        </StyledHeader>
        <Signup
          modalState={signupModal.modal}
          handleCloseModal={signupModal.closeModal} />
        <Login
          modalState={loginModal.modal}
          handleCloseModal={loginModal.closeModal} />
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
         <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}
export default LandingPage

const StyledHeader = styled(Header)`
  padding: 0;
  background: colorBgContainer;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
`

const GroupedButton = styled.div`
  margin-right: 1rem;
  & > *:nth-child(2) {
    margin-left: 10px;
  }
`



const SearchBox = styled(Input)`
  width: 40%;
  border-radius: 1.5rem;
  height: 2.5rem;
  margin-top: 0.8rem;
`
