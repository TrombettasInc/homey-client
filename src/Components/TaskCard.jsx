import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function TaskCard({ taskId, projectId, description, deadline, StartDate, isDone, getProject }) {

    const [checked, setChecked] = useState(isDone);
    const [taskData, setTaskData] = useState([]);

    const navigate = useNavigate();
    
    const storedToken = localStorage.getItem('authToken');

    useEffect(() => {
        axios
            .get(`${API_URL}/api/projects/${projectId}`, {
                headers: { Authorization: `Bearer ${storedToken}` }
            })
            .then((response) => {
                const project = response.data
                setTaskData(project.tasks); // Assuming tasks array is returned
            })
            .catch((error) => console.log(error));

    }, [projectId, storedToken]);


    const handleCheckboxChange = (event) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);

        axios.put(`${API_URL}/api/tasks/${taskId}`,
            { isDone: newChecked},
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then(() => {
                getProject();
                navigate(`/projects/${projectId}`)
            })
            .catch((error) => console.log(error));
    };


    const deleteTask = () => {

        //filters the corresponding task
        const updatedTasks = taskData.filter(task => task._id !== taskId);

        axios
            .delete(`${API_URL}/api/tasks/${taskId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } },
            )
            .then(() => {
                getProject();
                navigate(`/projects/${projectId}`)
            })
            .catch((error) => console.log(error));
    }


    return (
        <div className="TaskCard card">

            <h4> Description</h4>
            <h3>{description} </h3>
            <p>Deadline: {deadline ? new Date(deadline).toLocaleDateString() : 'No Deadline'}</p>
            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={handleCheckboxChange}
                    />
                    {checked ? 'done' : 'not done'}
                </label>
                <button onClick={deleteTask} className="edit-delete-task-button">Delete task</button>
            </div>
        </div>
    )
}
export default TaskCard;