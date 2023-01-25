import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import DeleteAppForm from './DeleteAppForm';

function AppointmentsList(){
    const [apps, setApps] = useState([])
    const [showForms, setShowForms] = useState({})

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/service/appointments/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setApps(data.appointments)
            apps.forEach((app) =>{
                const init = {[app.id]:false}
                setShowForms(showForms=>({
                        ...showForms,
                        ...init
                    })
                )
            })
        }
    }

    useEffect(() => {
        fetchData()
    }, []);
    //console.log(apps)

    const handlePlusClick = useCallback((event) =>{
        const index = event.target.value
        const updatedVal = {[index]:(!(showForms[index]))}
        setShowForms(showForms => ({
            ...showForms,
            ...updatedVal
        }))
    },[showForms])
    //console.log(apps)
    //console.log(showForms)
    return (
        <table>
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Vin</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Technician</th>
                </tr>
            </thead>
            <tbody>
                {
                    apps.map((app,i) =>{
                        let forms = (<div></div>)
                        let symbol = ``
                        if(showForms[app.id]){
                            symbol = `-` 
                            forms = (
                                <React.StrictMode>
                                    <DeleteAppForm />
                                </React.StrictMode>
                            )
                        } else {
                            symbol = `+`
                        }
                        
                        return(
                            <tr key={i}>
                                <td>{app.customer_name}</td>
                                <td>{app.vin}</td>
                                <td>{app.datetime}</td>
                                <td>{`${app.status}`}</td>
                                <td>{app.technician.name}</td>
                                <td>
                                    <button value={app.id} onClick={handlePlusClick}>
                                        {symbol}
                                    </button>
                                </td>
                                {forms}
                            </tr> 
                        )
                    })
                }
            </tbody>
        </table>
    )

}

export default AppointmentsList