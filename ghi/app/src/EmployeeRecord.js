import { useEffect, useState } from 'react';

function EmployeeRecord() {
  const [sales_persons, setEmployees] = useState([])
  const [formData, setFormData] = useState({
    employee: ''
})

  const getData = async () => {
    const response = await fetch('http://localhost:8090/api/employees/');

    if (response.ok) {
      const data = await response.json();
      setEmployees(data.sales_persons)
    }
  }

  const handleFormChange = (e) => {
    const value = e.target.value
    const inputName = e.target.name
    setFormData({
        ...formData,
        [inputName]: value
    })


    
    }


    useEffect(()=>{
        getData()
      }, [])

    return (

        <form id="employee-record-form">
            <div className="form-floating mb-3">
                <select value={formData.employee} onChange={handleFormChange} required name="employee" id="employee" className="form-select">
                    <option value="">Select an Employee</option>
                    {sales_persons.map(employee => {
                        return (
                            <option key={employee.id} value={employee.id}>
                                {employee.name}
                            </option>
                        );
                    })}
                </select>
            </div>
        </form>

    )

}


export default EmployeeRecord
