import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_CARD, DEL_COL } from './utils/mutations'

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

    setCardContent('')
}

const [delCol, {delColError}] = useMutation(DEL_COL);
const saveDeleteColumn = () => {
    try{
        const {data} = delCol({
            variables: {
                boardId,
                columnId: columnInfo._id,
            }
        })

    }catch (delColError){
        console.error("Unable to delete column", delColError)
    }
}

    return(
        <div>
            <p>{columnInfo.title}</p>
            <button onClick={(saveDeleteColumn)}>Delete Column</button>
            {columnInfo.cardArray.map(function (cardInfo, index) {
                return <Card card={{cardInfo, boardId, columnId:columnInfo._id}} key={index} />
            })}
            <input type='text' placeholder='add card' value={cardContent} onChange={(event)=>setCardContent(event.target.value)} ></input>
            <button onClick={saveAddCard}>Add Card</button>
        </div>
    )
}