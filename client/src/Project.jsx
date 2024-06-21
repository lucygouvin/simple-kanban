import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PROJECT } from "./utils/queries";

export default function Project() {
  const { projectId } = useParams();

  const { loading, data } = useQuery(PROJECT, {
    variables: { projectId: projectId },
  });

  console.log(data);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <main>
          <h1>Project Page</h1>
          <h2>{data.project.name}</h2>
          {data.project.boardArray.map(function (boardInfo, index) {
                return <a href = {`/board/${boardInfo._id}`}><p>{boardInfo.name}</p></a>
            })}
            <button>Add Board</button>
        </main>
      )}
    </div>
  );
}
