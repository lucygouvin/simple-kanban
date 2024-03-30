import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_CARD } from './utils/mutations'

import Card from './Card'
export default function Column({column:{columnInfo}, column:{boardId}}){
const [cardContent, setCardContent] = useState('')

const [addCard, {addCardError}] = useMutation(ADD_CARD);
const saveAddCard = () =>{
    try{
        const {data} = addCard({
            variables: {
                boardId,
                columnId: columnInfo._id,
                content: cardContent
            }
        })

    }catch(addCardError){
        console.error("Unable to add card", addCardError)
    }
}

    return(
        <div>
            <p>{columnInfo.title}</p>
            {columnInfo.cardArray.map(function (cardInfo, index) {
                return <Card card={{cardInfo, boardId}} key={index} />
            })}
            <input type='text' placeholder='add card' value={cardContent} onChange={(event)=>setCardContent(event.target.value)} ></input>
            <button onClick={saveAddCard}>Add Card</button>
        </div>
    )
}