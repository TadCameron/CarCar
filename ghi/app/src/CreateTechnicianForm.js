import { useCallback,useState } from "react"

function CreateTechnicianForm(props){
    const [name, setName] = useState("")
    const handleNameChange = useCallback((event) =>{
        const val = event.target.value
        setName(val)
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const url = 'http://localhost:8080/api/service/technicians/'

        const data = {"name":name}
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig)
        if (response.ok){
            
            const createdTechy = await response.json()
            console.log(createdTechy)
            props.updater()
            setName("")
            event.target.reset()
        }

        
    }

    return(
            <form onSubmit={handleSubmit} className="shadow" style={{margin: "5%",width:"100%"}}>
                <div className="row justify-items-center p-2">
                    <div className="col-sm-2 align-self-center" >
                        <label  style={{margin: "0%",width:"100%"}} className=" mx-auto" htmlFor="name">New Technician:</label>
                    </div>
                    <div className="col-sm-9">
                        <input onChange={handleNameChange} className="form-control" required placeholder="Name" type="text" name="name" id="name"></input>
                    </div>
                    <div className="col">
                        <button type = "submit" className="btn btn-primary mb-2">Create</button>
                    </div>
                </div>
            </form>
    )
}

export default CreateTechnicianForm