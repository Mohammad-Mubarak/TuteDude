import { HeartOutlined, EyeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Avatar, Card } from 'antd'

import { useState, useEffect } from 'react'
import axios from 'axios'
const { Meta } = Card


const BookCard = ({ product }) => {

  console.log("🧜‍♂️🦴 ~> file: BookCard.jsx:13 ~> BookCard ~> product:  :-> >", product._id)


  const navigate = useNavigate()

  const handleClickView = () => {
    navigate('/detail', { state: product })
  }

  const handleClickLove = () => {
    // api call to add in fav
    console.log("added")
  }

  return (
    <Card
      style={{
        width:"300px",
      }}
      cover={
        <Image
          alt="example"
          src={product.book_url}
        />
      }
      actions={[
        <EyeOutlined key="view" onClick={handleClickView} />,
        <HeartOutlined key="love" onClick={handleClickLove} />,
      ]}
    >
      <Meta
        avatar={<Avatar src={product.book_url} />}
        title={product.book_name}
        description={`Author-> ${product.book_author}`}
      />
    </Card>
  )
}
export default BookCard


const Image = styled.img`
  height: 300px;
  object-fit: cover;
`;

