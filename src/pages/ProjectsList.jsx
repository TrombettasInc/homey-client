import { useState, useEffect } from "react";
import axios from "axios" ;
import AddProject from "../Components/AddProject";
import ProjectCard from "../Components/ProjectCard";

const API_URL = "http://localhost:5005";

function ProjectList (){

    const [ projects, setProjects] = useState([]);

    const getAllProjects = () =>{

        const storedToken = localStorage.getItem("authToken");

        axios
        .get(`${API_URL}/api/projects`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((response)=> setProjects(response.data))
        .catch((error)=>console.log(error));
    };

    useEffect(()=>{
        getAllProjects();
    },[]);


  return ( //displays the create project form and the project card with some info in the main page//
    <div className="ProjectList">
        <AddProject getAllProjects={getAllProjects} /> 
        
        {projects.map((project)=>(
          <ProjectCard key={project._id}
          projectId={project._id}
          title={project.title}
          description={project.description}
          startDate={project.startDate}
          deadline={project.deadline}
          isDone={project.isDone}
          getProject={getAllProjects}
       />
        ))}
    </div>
  )

}


export default ProjectList;