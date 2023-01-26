import React from "react"
import AutosList from "./AutosList"
import CreateAutosForm from "./CreateAutosForm"

function AutomobilesManagerPage(){
    return (
        <React.StrictMode>
            <CreateAutosForm />
            <AutosList />
        </React.StrictMode>
    )

}

export default AutomobilesManagerPage