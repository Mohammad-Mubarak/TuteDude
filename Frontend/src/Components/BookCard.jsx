import { HeartOutlined, EyeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Avatar, Card } from 'antd'
import { ToastContainer, toast } from 'react-toastify'

import { useState, useEffect } from 'react'
import axios from 'axios'
const { Meta } = Card


const BookCard = ({ product }) => {

  const notify = () => toast.success(`👍 Added To Fav !`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })

  const navigate = useNavigate()

  const handleClickView = () => {
    navigate('/detail', { state: product })
  }

  const handleClickLove = async () => {
    let {_id} = JSON.parse(localStorage.getItem("user")) || ""

    let dataFav = {
      userId:_id,
      BookId:product._id
    }
    console.log("🧜‍♂️🦴 ~> file: BookCard.jsx:34 ~> handleClickLove ~> dataFav:  :-> >", dataFav)
    // api call to add in fav
   await axios.post("http://localhost:3000/favouraite",dataFav)
    notify()
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

