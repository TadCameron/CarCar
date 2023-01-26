import React, {useEffect, useState} from 'react';

function EmployeeRecord() {
    const [filterValue, setFilterValue] = useState("");
    const [sales, setSales] = useState([]);

    const getData = async () => {
        const url = 'http://localhost:8090/api/sales/'
        const response = await fetch(url)
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    }
    useEffect (() => {
        getData()
    }, [])

    const handleChange = (event) => {
        setFilterValue(event.target.value);
    }

    const filteredPerson = () => {
        return sales.filter((sale) =>
            sale.employee.name.toLowerCase().includes(filterValue)
            );
    }

    return (
        <>
        <h1> Salesperson Sales History </h1>
        <input onChange={handleChange} placeholder="Search name" />
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Salesperson</th>
                    <th>Customer name</th>
                    <th>Vin</th>
                    <th>Sales price</th>
                </tr>
                </thead>
                <tbody>
                    {filteredPerson().map((sale) => {
                        return (
                        <tr>
                            <td>{sale.employee.name }</td>
                            <td>{sale.customer.name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>{sale.sales_price}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}
export default EmployeeRecord;






















// import { useEffect, useState } from 'react';

// function EmployeeRecord() {
//   const [sales_persons, setEmployees] = useState([])
//   const [formData, setFormData] = useState({
//     employee: ''
// })

//   const getData = async () => {
//     const response = await fetch('http://localhost:8090/api/employees/');

//     if (response.ok) {
//       const data = await response.json();
//       setEmployees(data.sales_persons)
//     }
//   }

//   const handleFormChange = (e) => {
//     const value = e.target.value
//     const inputName = e.target.name
//     setFormData({
//         ...formData,
//         [inputName]: value
//     })



//     }


//     useEffect(()=>{
//         getData()
//       }, [])

//     return (

//         <form id="employee-record-form">
//             <div className="form-floating mb-3">
//                 <select value={formData.employee} onChange={handleFormChange} required name="employee" id="employee" className="form-select">
//                     <option value="">Select an Employee</option>
//                     {sales_persons.map(employee => {
//                         return (
//                             <option key={employee.id} value={employee.id}>
//                                 {employee.name}
//                             </option>
//                         );
//                     })}
//                 </select>
//             </div>
//         </form>

//     )

// }


// export default EmployeeRecord
