import React from 'react';
import { useEffect, useState } from 'react';
import { useCallback } from 'react';

function CreateAppointmentForm(){
    const [techies, setTechies] = useState([])
    const [form, setForm] = useState({})
    const [isVip, setVip] = useState(false)


    const fetchData = async () => {
        const url = 'http://localhost:8080/api/service/technicians/'

        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setTechies(data.technicians)
            
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    

    const handleFormChange = useCallback((event) => {
        async function is_vip(vin){
            const response = await fetch(`http://localhost:8080/api/service/is_vip/${vin}/`)
            if(response.ok){
                const vip_data = await response.json()
                setVip(vip_data.vip)
            }
        }
        const val = event.target.value
        const key = event.target.name
        if(key === "vin"){
            is_vip(val)
        }

        const updatedVal = {[key]:val}

        setForm( form => ({
            ...form,
            ...updatedVal
        }))
    },[setVip])
    //console.log(form)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = 'http://localhost:8080/api/service/appointments/'
        let data = {}

        const datetime = `${form["date"]}:00+${form["time"]}` 
        data["datetime"] = datetime
        data["status"] = false
        Object.keys(form).forEach((key)=>{
            if(!(key === "date" || key === "time")){
                data[key] = form[key]
            }
        })
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig)
        if (response.ok){
            const createdApp = await response.json()
            console.log(createdApp)
        }
    }

    function is_vip(){
        if(isVip) return <h2>Welcome back vip!</h2>
        return 
    }

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4"> 
              <h1>Make an Appointment!</h1>
                {
                    is_vip() 
                }
              <form onSubmit={handleSubmit} id="create-location-form" >
                <div className="mb-3">
                    <div className="form-floating mb-3">
                        <input  onChange={handleFormChange} placeholder="John Doe" required type="text" name="customer_name" id="customer_name" className="form-control"></input>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input  onChange={handleFormChange} placeholder="empty vin" required type="text" name="vin" id="vin" className="form-control"></input>
                        <label htmlFor="name">VIN</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input  onChange={handleFormChange} placeholder="John Doe" required type="date" name="date" id="date" className="form-control"></input>
                        <label htmlFor="name">Date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input  onChange={handleFormChange} placeholder="John Doe" required type="time" name="time" id="time" className="form-control"></input>
                        <label htmlFor="name">Time</label>
                    </div>
                    <select onChange={handleFormChange}  required name="technician" id="technician" className="form-select">
                        <option value="">Choose a Technician</option>
                        {
                            techies.map((techy, i) => {
                                
                                return (
                                    <option value={techy.id} key={i}>
                                        {techy.name}
                                    </option>
                                );
                            })
                        }
                    </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
    )

}

export default CreateAppointmentForm
