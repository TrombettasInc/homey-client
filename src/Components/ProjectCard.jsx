import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function ProjectCard({ title, description, startDate, isDone, projectId, deadline, getProject, Tasks }) {

    const [checked, setChecked] = useState(isDone);
    
    const storedToken = localStorage.getItem('authToken');

    const handleCheckboxChange = (event) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);

        axios.put(`${API_URL}/api/projects/${projectId}`,
            { isDone: newChecked },
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then((response) => {
                getProject();
                console.log("project status updated", response.data)
                
            })
            .catch((error) => console.log(error));
    };
    return (
        <div className="ProjectCard card">
            <Link to={`/projects/${projectId}`} state={{title, description, startDate, isDone, Tasks, projectId, deadline }} >
                <h3>{title}</h3>
            </Link>
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleCheckboxChange}
                />
                {checked ? 'done' : 'not done'}
            </label>


        </div>
    )
}
export default ProjectCard;