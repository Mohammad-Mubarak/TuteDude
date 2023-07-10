import { StarFill } from '@styled-icons/bootstrap/StarFill'
import styled from 'styled-components'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from "axios"

const Star = ({ bookid }) => {
  const notify = () => toast.success(`⭐ rating added !`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  })
  const [starsRating, setStarsRating] = useState(0)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const fun = (cur) => {
    const datamsg = {
      rate: cur,
      bookid: bookid
    }
    axios.post(`http://localhost:3000/addreview`, datamsg)
      .then(response => {
        console.log(response.data)
      })
    notify()
  }

  return (
    <Container>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1
        return (
          <Label key={index}>
            <Input
              type='radio'
              name='rating'
              value={currentRating}
              onClick={() => {
                setRating(currentRating)
                setStarsRating(currentRating)
                fun(currentRating)
              }}
            />

            <StarIcon
              className='star'
              size={30}
              color={currentRating <= (hover || rating) ? `#f5b342` : `#c2c0be`}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            />

          </Label>
        )
      })}
    </Container>
  )
}

export default Star

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RatingLabel = styled.span`
  font-size: 12px;
  margin-top: 8px;
`
const Input = styled.input`
  display: none;
`

const StarIcon = styled(StarFill)`
  cursor: pointer;
`

