import { useState, useEffect } from "react";
import axios from "axios" ;
import ProjectCard from "../Components/ProjectCard";
import { useNavigate } from "react-router-dom";



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

    const handleCreateProject = () => {
      navigate('/create', { state: { getAllProjects } }); // Pass props using state
    };


  return ( //displays the create project form and the project card with some info in the main page//
    <div className="ProjectList">
        <button onClick={handleCreateProject}>Create Project</button>
        
        {projects.map((project)=>(
          <ProjectCard key={project._id}
          projectId={project._id}
          title={project.title}
          isDone={project.isDone}
          getProject={getAllProjects}
       />
        ))}
    </div>
  )

}


export default ProjectList;