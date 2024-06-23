import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import {useState} from 'react';
import { BOARD } from "./utils/queries";
import {ADD_COL, DEL_BOARD} from './utils/mutations';

import Column from './Column'

export default function Board() {
  const { boardId } = useParams();
  const {projectId} = useParams();

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

  const [deleteBoard, {deleteBoardError}] = useMutation(DEL_BOARD);
  const saveDeleteBoard = async() => {
    try{
      const {data} = deleteBoard({
        variables: {
          boardId,
          projectId
        }
      })
      window.location.href = `/project/${projectId}`;
    }catch(deleteBoardError){
      console.error("Unable to delete board", deleteBoardError)
    }
  }
// console.log(boardId)
//   console.log(data);

  return <div>{loading ? <p>Loading...</p> : <main>
        <h1>Board Page</h1>

    {/* <script src="https://accounts.google.com/gsi/client" async></script>
    <div id="g_id_onload"
     data-client_id="77166529193-0ia7megl5lvnsjh3763rj74vps39a321.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-login_uri="http://localhost:3001"
     data-auto_prompt="false">
</div>

<div class="g_id_signin"
     data-type="standard"
     data-shape="rectangular"
     data-theme="outline"
     data-text="signin_with"
     data-size="large"
     data-logo_alignment="left">
</div> */}
    <p>{data.board.name}</p>
    <button onClick={(saveDeleteBoard)}>Delete Board</button>
    {data.board.columnArray.map(function (columnInfo, index) {
        return <Column column={{columnInfo, boardId}} key={index}/>
    })}

    <input type='text' placeholder="new column" value={colTitle} onChange={(event)=>setColTitle(event.target.value)}></input>
    <button onClick={saveAddColumn}>Add Column</button>


    

    </main>}
    </div>;
}
