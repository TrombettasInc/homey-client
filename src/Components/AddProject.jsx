import { useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const API_URL = "http://localhost:5005";

function AddProject(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [deadline, setDeadline] = useState("");
    const [isDone, setIsDone] = useState(false);

   
    const navigate = useNavigate();
    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create an object representing the body of the POST request
        const requestBody = { title, description, startDate, deadline, isDone };
    
        const storedToken = localStorage.getItem('authToken');
    
    
        axios
            .post(`${API_URL}/api/projects`, requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                // Reset the state to clear the inputs
                setTitle("");
                setDescription("");
                setStartDate("");
                setDeadline("");
                setIsDone(false)
                
                // Get the created project's ID from the response
                const createdProjectId = response.data._id; 

                // Invoke the callback function coming through the props
                // from the ProjectDetailsPage, to refresh the project details
                props.getAllProjects();
                navigate(`/projects/${createdProjectId}`)
            })
            .catch((error) => console.log(error));
    };


    return (
        <div className="create-project-container">
            <button className="create-project-back-button">back</button>
            <h3 className="create-project-header">Create Project</h3>

            <form onSubmit={handleSubmit}>
                <label className="create-project-form-title">Project Title</label>
                <input
                    type="text"
                    name="your project title"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label className="create-project-form-deadline" >Deadline</label>
                <input
                    type="date"
                    name="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />

                <label className="create-project-form-description">Description</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit" className="create-project-button">Create!</button>
            </form>
        </div>


    );
}
export default AddProject;