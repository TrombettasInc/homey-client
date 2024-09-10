import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectList from "./ProjectsList";
import { Link } from "react-router-dom";


function EditProjectPage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [isDone, setIsDone] = useState("");

    const { projectId } = useParams();
    const navigate = useNavigate();

    const storedToken = localStorage.getItem('authToken');


    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {

                const projectToEdit = response.data;

                setTitle(projectToEdit.title);
                setDescription(projectToEdit.description);
                setDeadline(projectToEdit.deadline);
                setIsDone(projectToEdit.isDone);
            })
            .catch((error) => console.log(error));

    }, [projectId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description, deadline, isDone };
    

        axios
            .put(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                navigate(`/projects/${projectId}`)
            });
    };

    const deleteProject = () => {

        axios
            .delete(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then(() => {
                navigate("/projects");
            })
            .catch((err) => console.log(err));
    };


    return (

        <div className="edit-project-container">
            
            <h3 className="edit-project-header">Edit Project</h3>

            <form onSubmit={handleFormSubmit} >
                <label className="edit-project-form-title"> Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                />

                <label className="edit-project-form-deadline" >Deadline</label>
                <input
                    type="date"
                    name="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />

                <label className="edit-project-form-description" >Description</label>
                <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit" className="edit-project-button"> Update</button>
            </form>

            <button onClick={deleteProject} className="edit-delete-project-button">Delete</button>
        </div>
    )
}

export default EditProjectPage;