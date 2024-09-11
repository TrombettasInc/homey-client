import { useState, useEffect } from "react";
import axios from "axios" ;
import ProjectCard from "../Components/ProjectCard";
import { useNavigate } from "react-router-dom";
import {Link } from "react-router-dom";

function ProjectList (){

    const [ projects, setProjects] = useState([]);
    const navigate = useNavigate();

    const getAllProjects = () =>{

        const storedToken = localStorage.getItem("authToken");

        axios
        .get(`${import.meta.env.VITE_API_URL}/api/projects`,
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
        
        {projects.map((project)=>(
          <ProjectCard key={project._id}
          projects={projects}
          projectId={project._id}
          title={project.title}
          isDone={project.isDone}
          startDate={project.startDate}
          getProject={getAllProjects}
       />
        ))}
    </div>
  )

}


export default ProjectList;