import { useEffect, useState } from 'react';
import { useCallback } from 'react';

function CreateAutosForm(){
    const [models, setModels] = useState([])
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/'
        const response = await fetch(url)

        if(response.ok){
            const data = await response.json()

            setModels(data.models)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    


    return(
        <div>CreateAutosForm</div>
    )
}

export default CreateAutosForm