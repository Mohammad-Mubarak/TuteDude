import React,{useState,useContext} from 'react'
import BookCard from "./BookCard"
import styled from "styled-components"
import { ProductContext } from '../Helper/Context'
function AllBooks() {
    const {allBooks } = useContext(ProductContext)
  return (
    <>
          <Container>
            {allBooks.map((product) => {
              return <BookCard key={product.id} product={product} />
            })}
          </Container>
    </>
  )
}

export default AllBooks

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`