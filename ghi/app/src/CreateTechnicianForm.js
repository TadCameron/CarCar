
function CreateTechnicianForm(props){
    return(
            <form className="shadow" style={{margin: "5%",width:"100%"}}>
                <div className="form-group row">
                    <label  className="col-sm-2 col-form-label" htmlFor="name">Technician:</label>
                    <div className="col-sm-10">
                        <input className="form-control" required placeholder="Name" type="text" name="name" id="name"></input>
                    </div>
                    <div className="col-sm-10">
                        <button type = "submit" className="btn btn-primary mb-2">Create</button>
                    </div>
                </div>
                
            </form>
    )
}

export default CreateTechnicianForm