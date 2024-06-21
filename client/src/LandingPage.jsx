import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_PROJECT } from "./utils/mutations";

export function LandingPage() {

  const [projectName, setProjectName] = useState('')

  const [addProject, {addProjectError}] = useMutation(ADD_PROJECT);
  const saveAddProject = async() => {
    try{
      const newProject = await addProject({
        variables:{
          name: projectName
        }
      })
      const projectId = newProject.data.addProject._id
      window.location.href = `/project/${projectId}`
    }catch(addProjectError){
      console.error("Unable to add project", addProjectError)
    }
    setProjectName('')
  }

  return (
    <>
      <h1>Landing Page!</h1>
      <input type="text" placeholder="new project" value={projectName} onChange={(event)=>setProjectName(event.target.value)}></input>
      <button onClick={saveAddProject}>Add Project</button>
    </>
  );
}

export default LandingPage;
