import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';

function AutosList(){
    const [autos, setAutos] = useState([])

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/automobiles/'
        const response = await fetch(url)

        if(response.ok){
            const data = await response.json()
            setAutos(data.autos)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <table key="a-1">
            <thead key="a-2">
                <tr key="a-3">
                    <th>Image</th>
                    <th>Model</th>
                    <th>Make</th>
                    <th>Year</th>
                    <th>Color</th>  
                    <th>VIN</th>
                </tr>
            </thead>
            <tbody key="a-4">
                {
                    autos.map((auto, i) => {
                        const alt_text =   `a ${auto.color} ${auto.year} ${auto.model.manufacturer.name} ${auto.model.name}`
                        return [
                            <tr key={i}>
                                <td style={{width:"20%"}}>
                                    <img className="img-fluid" style={{width:"100%"}} src={auto.model.picture_url} alt={alt_text}></img>
                                </td>
                                <td>{auto.model.name}</td>
                                <td>{auto.model.manufacturer.name}</td>
                                <td>{auto.year}</td>
                                <td>{auto.color}</td>
                                <td>{auto.vin}</td>
                            </tr>
                        ]
                    })
                }
            </tbody>
        </table>
    )
}
export default AutosList