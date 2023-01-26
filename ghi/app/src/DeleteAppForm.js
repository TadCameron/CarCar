import React from 'react';

function DeleteAppForm(props){

    const handleSubmit = async (event) => {
        
        const url = `http://localhost:8080/api/service/appointments/${props.app_id}/`

        const fetchConfig = {
            method: "delete",
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            const deleteApp = await response.json();
            console.log(deleteApp)
        }
        props.updater()
    }

    return (
        <button onClick={handleSubmit}>Delete</button>  
    )
}

export default DeleteAppForm