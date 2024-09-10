import { useState } from "react";
import axios from "axios";



function AddTask({projectId, getProject}) {
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [deadline, setDeadline] = useState("");
    const [isDone, setIsDone] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

       
        // Create an object representing the body of the POST request
        const requestBody = { description, startDate, deadline, isDone, projectId };
        
        const storedToken = localStorage.getItem('authToken');

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/tasks`, requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                // Reset the state to clear the inputs
                setDescription("");
                setStartDate("");
                setDeadline("");


                // Invoke the callback function coming through the props
                // from the ProjectDetailsPage, to refresh the project details
                getProject();
            })
            .catch((error) => console.log(error));
    };


    return (
        <div className="create-task">

            <h3 className="create-task-header">Add New Task</h3>

            <form onSubmit={handleSubmit}>

                <label className="create-task-form-description">Description</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label className="create-task-form-deadline">deadline</label>
                <input
                    type="date"
                    name="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />

                <button type="submit" className="create-task-button">Add!</button>
            </form>
        </div>
    );
}

export default AddTask;