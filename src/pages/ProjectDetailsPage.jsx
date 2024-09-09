import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AddTask from "../Components/AddTask";
import TaskCard from "../Components/TaskCard";
import EditProjectPage from "./EditProjectPage";

const API_URL = "http://localhost:5005";

function ProjectDetailsPage() {
    const [project, setProject] = useState(null);
    const { projectId } = useParams();
    const storedToken = localStorage.getItem("authToken");
    
    // Fetch project data
    const getProject = () => {
        axios
            .get(`${API_URL}/api/projects/${projectId}`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response) => {
                setProject(response.data);
                console.log("API response:", response.data); // Log the project data
            })
            .catch((error) => console.log("Error fetching project:", error));
    };

    useEffect(() => {
        getProject();
    }, [projectId]);

    return (
        <div className="ProjectDetails">
            {project ? (
                <>
                    <h1>Title: {project.title}</h1>
                    <p>Description: {project.description}</p>
                    <p>Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
                    <p>Deadline: {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No Deadline'}</p>

                    <p>Status: {project.isDone ? 'Done' : 'Not Done'}</p>

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
