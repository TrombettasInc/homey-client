import { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "../Components/ProjectCard";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ProjectList() {

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const getAllProjects = () => {

    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/projects`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => setProjects(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div>
      {projects.length === 0 ? (
        // Display a message when there are no projects
        <div>
          <h1 className="emptyProjectTitle">let’s go!</h1>
          <div className="emptyProjectSubtitle">
            <p>
              looks like you don’t currently have any projects, but no problem, click
              the button to
            </p>
            <Link to="/create-project" className="create-project-button">
              create!
            </Link>
          </div>
        </div>
      ) : (
        // Map through the projects and display ProjectCard components
        projects.map((project) => (
          <ProjectCard
            key={project._id}
            projects={projects}
            projectId={project._id}
            title={project.title}
            isDone={project.isDone}
            startDate={project.startDate}
            getProject={getAllProjects}
          />
        ))
      )}
    </div>
  );
}


export default ProjectList;