import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PROJECT } from "./utils/queries";
import { ADD_BOARD, DEL_BOARD } from "./utils/mutations";

export default function Project() {
  const { projectId } = useParams();

  const { loading, data } = useQuery(PROJECT, {
    variables: { projectId: projectId },
  });

  const [boardName, setBoardName] = useState("");

  const [addBoard, { addBoardError }] = useMutation(ADD_BOARD);
  const saveAddBoard = async () => {
    try {
      const newBoard = await addBoard({
        variables: {
          projectId: projectId,
          name: boardName,
        },
      });
      const boardId = newBoard.data.addBoard._id;
      window.location.href = `/project/${projectId}/board/${boardId}`;
    } catch (addBoardError) {
      console.error("Unable to add board", addBoardError);
    }
    setBoardName("");
  };

  const [deleteBoard, {deleteBoardError}] = useMutation(DEL_BOARD);
  const saveDeleteBoard = async(boardId) => {
    try{
      const {data} = deleteBoard({
        variables: {
          boardId,
          projectId
        }
      })
    }catch(deleteBoardError){
      console.error("Unable to delete board", deleteBoardError)
    }
  }


  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <main>
          <h1>Project Page</h1>
          <h2>{data.project.name}</h2>
          {data.project.boardArray.map(function (boardInfo, index) {
            return (
              <> 
              <a href={`/project/${projectId}/board/${boardInfo._id}`}>
                <p>{boardInfo.name}</p>
              </a>
              <button onClick={()=>saveDeleteBoard(boardInfo._id)}>Delete Board</button>
              </>
             
            );
          })}
          <div>
            <input
              type="text"
              placeholder="new board"
              value={boardName}
              onChange={(event) => setBoardName(event.target.value)}
            ></input>
            <button onClick={saveAddBoard}>Add Board</button>
          </div>
        </main>
      )}
    </div>
  );
}
