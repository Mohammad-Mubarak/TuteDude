import { StarFill } from '@styled-icons/bootstrap/StarFill'
import styled from 'styled-components'
import { useState } from 'react'

const Star = () => {
    const [starsRating, setStarsRating] = useState(0)
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const fun=(cur)=>{
    console.log(cur)
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

