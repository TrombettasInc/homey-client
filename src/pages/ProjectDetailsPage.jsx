import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AddTask from "../Components/AddTask";
import TaskCard from "../Components/TaskCard";
import EditProjectPage from "./EditProjectPage";
import ProjectCard from "../Components/ProjectCard";

const API_URL = "http://localhost:5005";

function ProjectDetailsPage() {
    const [project, setProject] = useState(null);
    const { projectId } = useParams();
    const [checked, setChecked] = useState(false);

    const storedToken = localStorage.getItem("authToken");
    
    // Fetch project data
    const getProject = () => {
        axios
            .get(`${API_URL}/api/projects/${projectId}`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response) => {
                setProject(response.data);
                setChecked(response.data.isDone); 
                console.log("API response:", response.data); // Log the project data
            })
            .catch((error) => console.log("Error fetching project:", error));
    };

    useEffect(() => {
        getProject();
    }, [projectId]);

    const handleCheckboxChange = (event) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);

        // Update the project status in the backend
        axios
            .put(`${API_URL}/api/projects/${projectId}`, { isDone: newChecked }, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response) => {
                getProject(); // Refetch project data to ensure it's up to date
                console.log("Project status updated:", response.data);
            })
            .catch((error) => console.log("Error updating project status:", error));
    };

    return (
        <div className="ProjectDetails">
            {project ? (
                <>
                    <h1>Title: {project.title}</h1>
                    <p>Description: {project.description}</p>
                    <p>Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
                    <p>Deadline: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No Deadline'}</p>

                    <label>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={handleCheckboxChange}
                        />
                        {checked ? 'Done' : 'Not Done'}
                    </label>

                    <EditProjectPage project={project} />
                    <AddTask getProject={getProject} projectId={projectId} />

                    {project.tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            taskId={task._id}
                            projectId={projectId}
                            description={task.description}
                            deadline={task.deadline}
                            StartDate={task.StartDate}
                            isDone={task.isDone}
                            getProject={getProject}
                        />
                    ))}
                </>
            ) : (
                <p>Loading project data...</p>
            )}

            <Link to="/projects">
                <button>Back To Projects</button>
            </Link>
        </div>
    );
}

export default ProjectDetailsPage;
