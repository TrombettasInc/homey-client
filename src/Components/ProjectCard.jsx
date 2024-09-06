import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function ProjectCard({ title, description, StartDate, isDone, Tasks, _id, deadline }) {

    const [checked, setChecked] = useState(isDone);

    const navigate = useNavigate();
    
    const storedToken = localStorage.getItem('authToken');

    const handleCheckboxChange = (event) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);

        axios.put(`${API_URL}/api/projects/${projectId}`,
            { isDone: newChecked },
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then(() => {
                getProject();
                navigate(`/projects/${projectId}`)
            })
            .catch((error) => console.log(error));
    };
    return (
        <div className="ProjectCard card">
            <Link to={`/projects/${_id}`} >
                <h3>{title}</h3>
            </Link>
            <p>{description} </p>
            <p>{StartDate} </p>
            <p>{Tasks} </p>
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