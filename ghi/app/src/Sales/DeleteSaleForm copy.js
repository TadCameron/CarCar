import React, { useState, useEffect } from 'react';

function DeleteSaleForm() {
    const [formData, setFormData] = useState({
        id: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = 'http://localhost:8090/api/sales/'

        const fetchConfig = {
            method: 'DELETE',
            body: JSON.formData,
            headers: { 'Content-Type': 'application/json' }
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            setFormData({
                id: ''
            })
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Delete the sale! Bury the evidence!</h1>
                    <form onSubmit={handleSubmit} id="delete-sales-form">
                        <div className="form-floating mb-3">
                            <input
                                value={formData.id}
                                placeholder="id"
                                required
                                type="number"
                                name="id"
                                id="id"
                                className="form-control"
                            />
                            <label htmlFor="Id">Enter the ID number of Sale</label>
                        </div>
                        <button className="btn btn-primary">Delete</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DeleteSaleForm
