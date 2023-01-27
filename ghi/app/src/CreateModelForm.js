import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';

function CreateModelForm(props){
    const [makers, setMakers] = useState([])
    const [form, setForm] = useState({
        "name":"",
        "picture_url":"",
        "manufacturer_id":""
    })

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(url)

        if (response.ok){
            const data = await response.json()
            setMakers(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleFormChange = useCallback((event) =>{
        const val = event.target.value
        const key = event.target.name.toString()
        
        const updatedVal = {[key]:val}
        setForm( form => ({
            ...form,
            ...updatedVal
        }))

    },[])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = 'http://localhost:8100/api/models/'
        const data = form

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            event.target.reset()
            setForm({
                "name":"",
                "picture_url":"",
                "manufacturer_id":""
            })
            props.updater()
        }
    }

    
    

    return(
        <form onSubmit={handleSubmit} className="shadow m-3 p-3 rounded-pill">
            <div className="row justify-content-center m-2">
                <input onChange={handleFormChange} required className="col-4 form-control-sm rounded-pill m-1" type="text" name="name" placeholder="Name"></input>
                <input onChange={handleFormChange} required className="col-7 form-control-sm rounded-pill m-1" type="url" name="picture_url" placeholder='http://somepicture.jgp'></input>
            </div>
            <div className="row justify-content-center m-2">
                <select onChange={handleFormChange} required className="col-6 form-select-sm rounded-pill m-1" name="manufacturer_id" id="manufacturer_id" >
                    <option  value="manufacturer_id">Manufacturers</option>
                    {
                        makers.map((make,i) =>{
                            return[
                                <option value={make.id} key={i}>
                                    {make.name}
                                </option>
                            ]
                        })
                    }
                </select>
                <button className="col-3 rounded-pill btn btn-primary m-1">Create</button>
            </div>
        </form>
    )
}

export default CreateModelForm