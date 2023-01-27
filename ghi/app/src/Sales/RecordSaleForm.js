import React, { useState, useEffect } from 'react';

function RecordSaleForm() {
    const [automobiles, setAutomobiles] = useState([])
    const [customers, setCustomers] = useState([])
    const [salespeople, setSalespeople] = useState([])
    const [formData, setFormData] = useState({
        automobile: '',
        employee: '',
        customer: '',
        sales_price: ''
    })

    const getData = async () => {
        const salespeopleUrl = 'http://localhost:8090/api/employees/'
        const response = await fetch(salespeopleUrl)
        if (response.ok) {
            const salesPeopleData = await response.json()
            setSalespeople(salesPeopleData.sales_persons)
        }

        const customersUrl = 'http://localhost:8090/api/customers/'
        const customerResponse = await fetch(customersUrl)
        if (customerResponse.ok) {
            const customersData = await customerResponse.json()
            setCustomers(customersData.customers)
        }

        const autoUrl = 'http://localhost:8090/api/automobiles/'
        const autoResponse = await fetch(autoUrl)
        if (autoResponse.ok) {
            const autoData = await autoResponse.json()
            setAutomobiles(autoData.automobileVO)
        }

    }
    useEffect(() => {
        getData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = 'http://localhost:8090/api/sales/'

        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            setFormData({
                automobile: '',
                salesperson: '',
                customer: '',
                sales_price: ''
            })
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
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a Sale, Alpha-Male</h1>
                    <form onSubmit={handleSubmit} id="create-sales-form">
                        <div className="form-floating mb-3">
                            <select value={formData.automobile} onChange={handleFormChange} required name="automobile" id="automobile" className="form-select">
                                <option value="">Choose an automobile</option>
                                {automobiles.map(automobile => {
                                    return (
                                        <option key={automobile.vin} value={automobile.id}>
                                            {automobile.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select value={formData.customer} onChange={handleFormChange} required name="customer" id="customer" className="form-select">
                                <option value="">Choose a customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <select value={formData.salesperson} onChange={handleFormChange} required name="employee" id="employee" className="form-select">
                                <option value="">Choose a salesperson</option>
                                {salespeople.map(person => {
                                    return (
                                        <option key={person.id} value={person.id}>
                                            {person.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                onChange={handleFormChange}
                                value={formData.sales_price}
                                placeholder="Sales Price"
                                required
                                type="number"
                                name="sales_price"
                                id="sales_price"
                                className="form-control"
                            />
                            <label htmlFor="sales_price">Sales Price</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RecordSaleForm
