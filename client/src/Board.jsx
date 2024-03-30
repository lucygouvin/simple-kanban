import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import {useState} from 'react';
import { BOARD } from "./utils/queries";
import {ADD_COL} from './utils/mutations';

import Column from './Column'

export default function Board() {
  const { boardId } = useParams();

  const { loading, data } = useQuery(BOARD, {
    variables: { boardId: boardId },
  });

  const [colTitle, setColTitle] = useState('')

  const [addColumn, {addColError}] = useMutation(ADD_COL);
  const saveAddColumn = () => {
    try{
        const {data} = addColumn({
            variables:{
                boardId,
                title: colTitle,
            }
        })
    }catch (addColError){
        console.error("Unable to add column", addColError)
    }
    setColTitle('')
  }

  console.log(data);

  return <div>{loading ? <p>Loading...</p> : <main>
    <h1>Board Page</h1>
    <p>{data.board.name}</p>
    {data.board.columnArray.map(function (columnInfo, index) {
        return <Column column={{columnInfo, boardId}} key={index}/>
    })}

    <input type='text' placeholder="new column" value={colTitle} onChange={(event)=>setColTitle(event.target.value)}></input>
    <button onClick={saveAddColumn}>Add Column</button>


    

    </main>}
    </div>;
}
