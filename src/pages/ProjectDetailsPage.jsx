import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AddTask from "../Components/AddTask";
import TaskCard from "../Components/TaskCard";
import EditProjectPage from "./EditProjectPage";


const API_URL = "http://localhost:5005";

function ProjectDetailsPage(props) {
    const [project, setProject] = useState(null);
    const { projectId } = useParams();
    const storedToken = localStorage.getItem("authToken");


    const getProject = () => {
        axios
            .get(`${API_URL}/api/projects/${projectId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                const oneProject = response.data;
                setProject(oneProject);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getProject();
    }, []);


    return ( //displays all the selected project info, the project edit button and the tasks and create task form for that project //
        <div className="ProjectDetails">  
            {project && (
                <>
                    <h1>A{project.title} </h1>
                    <p>B{project.description} </p>
                    <p>C{project.startDate} </p>
                    <p>D{project.deadline} </p>
                    <p>E{project.isDone} </p>

                    <EditProjectPage />
                </>
            )}

            <AddTask getProject={getProject} projectId={projectId} />

            {project && project.tasks.map((task) => (
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

            <Link to="/projects">
                <button>Back To Projects</button>
            </Link>

        </div>
    );
}

export default ProjectDetailsPage