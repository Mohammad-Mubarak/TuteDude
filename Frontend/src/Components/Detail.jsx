import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { Row, Col, Typography, Card, Input, Carousel, Button } from "antd"
import { useLocation } from "react-router-dom"
import Star from "./Star"
import { ToastContainer, toast } from 'react-toastify'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Space } from 'antd'
import axios from "axios"
import BookCard from "./BookCard"
import { ProductContext } from "../Helper/Context"
const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'


const Detail = ({ state }) => {
  const notify = () => toast.success(`👍 review added !`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })

  const { allBooks, setAllBooks } = useContext(ProductContext)
  const [Book, setBook] = useState({})
  const [Allreview, setAllreview] = useState([])
  const [textareaValue, setTextareaValue] = useState("")
  const location = useLocation()

  function fetchRecom(data) {
    axios.get(`http://localhost:3000/search/${data}`)
      .then(response => {
        setAllBooks(response.data)
      })
      .catch(error => {
        console.error('Error:', error)
      })

    const bookidNo = location.state
    axios.get(`http://localhost:3000/getreview/${bookidNo._id}`)
      .then(response => {
        setAllreview(response.data[0].comments)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }


  function toGetReviewUpdate(){
    const bookidNo = location.state
    axios.get(`http://localhost:3000/getreview/${bookidNo._id}`)
      .then(response => {
        setAllreview(response.data[0].comments)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  useEffect(() => {
    const data = location.state
    fetchRecom(data.book_genre)
    setBook(data)
  }, [location.state])

  const { Text, Title } = Typography
  const { TextArea } = Input

  function handleClick() {
    let { name } = JSON.parse(localStorage.getItem("user"))
    const datamsg = {
      name: name,
      comment: textareaValue,
      bookid: Book._id
    }

    axios.post(`http://localhost:3000/addreview`, datamsg)
      .then(response => {
        toGetReviewUpdate()
        console.log(response.data)
      })
    notify()
  }

  return (
    <Container>
      <Row gutter={16}>
        <Col>
          <Image src={Book.book_url} />
        </Col>


        <Col span={10}>
          <Title level={4} style={{ textAlign: "left", fontSize: "20px", color: "green" }}>
            {Book.book_name}
          </Title>


          <Space size={16} wrap>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            {Book.book_author}
          </Space>

          <Title level={4} style={{ textAlign: "left" }}>
            <span style={{ fontSize: "15px", color: "red", fontWeight: "bold", marginRight: "5px" }}>
              {Book.book_genre}
            </span>

            <span style={{ fontSize: "15px", color: "grey", fontWeight: "bold" }}>
              {Book.book_publish_year}
            </span>

          </Title>

          <Title level={4} style={{ textAlign: "left" }}>
            {Book.book_description}

          </Title>


          <Row align="start">
            <Col>
              <br />
              <Text style={{ textAlign: "left", fontSize: "16px" }}>
                <b>Rate</b>
              </Text>
            </Col>
          </Row>

          <Row align="start">
            <Col>
              <Star bookid={Book._id}
              />
            </Col>
          </Row>

          <Row align="start">
            <Col>
              <br />
              <Text style={{ textAlign: "left", fontSize: "16px" }}>
                <b>Write a review:</b>
              </Text>
            </Col>
          </Row>
          <Row align="start">
            <Col>
              <TextArea
                style={{ width: "400px" }}
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
            </Col>
          </Row>

          <Row align="start">
            <Col>
              <Button style={{ marginTop: "0.5rem" }} onClick={handleClick}>
                Submit
              </Button>
            </Col>
          </Row>
        </Col>


        <Col>
          <Row>
            <Title level={4}>
              <b>Reviews 🧑‍🦳</b>
            </Title>
          </Row>
          <Row>
            {
              Allreview.length === 0 ? null : <>
                <ScrollableCard>
                  {Allreview.map((comment) => {
                    return (
                      <CommentCard>
                        <Space size={16} wrap>
                          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </Space>
                        <span style={{ color: "red" }}>{comment.name}: </span><br />{comment.message}
                      </CommentCard>
                    )
                  })}
                </ScrollableCard>
              </>
            }

          </Row>
        </Col>


      </Row>
      <br />
      <Title level={6} style={{ textAlign: "left" }}>
        Books recommended for you
      </Title>
      <Row>
        <Col>
          <RecomContainer>
            {allBooks.map((product) => {
              return <BookCard key={product.id} product={product} />
            })}
          </RecomContainer>
        </Col>
      </Row>
    </Container>
  )
}

export default Detail

const Image = styled.img` 
  height: 400px;
`


const Container = styled(Card)` 
  padding: 1rem;
`



const RecomContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`


const ScrollableCard = styled(Card)`
  height: 300px;
  max-width: 300px;
  overflow: auto;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`


const CommentCard = styled(Card)`
  padding: 0.4rem;
  margin: 0.5rem;
  border-radius: 1rem;
`;



