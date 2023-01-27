import { useEffect, useState } from "react";
import { useCallback } from "react";

function CreateAutosForm(props) {
  const [models, setModels] = useState([]);
  const [form, setForm] = useState({
    color: "",
    year: "",
    vin: "",
    model_id: "",
  });
  const fetchData = async () => {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      setModels(data.models);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleFormChange = useCallback((event) => {
    const val = event.target.value;
    const key = event.target.name.toString();

    const updatedVal = { [key]: val };
    setForm((form) => ({
      ...form,
      ...updatedVal,
    }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:8100/api/automobiles/";
    const data = form;

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newCar = await response.json();

      event.target.reset();
      setForm({
        color: "",
        year: "",
        vin: "",
        model_id: "",
      });
      props.updater();
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Enter a Car</h1>
          <form onSubmit={handleSubmit} id="create-location-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder={`${form.color}`}
                required
                type="text"
                name="color"
                id="color"
                className="form-control"
              ></input>
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder={`${form.year}`}
                required
                type="year"
                name="year"
                id="year"
                className="form-control"
              ></input>
              <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                placeholder={`${form.vin}`}
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
              ></input>
              <label htmlFor="color">VIN</label>
            </div>
            <select
              onChange={handleFormChange}
              required
              name="model_id"
              id="model_id"
              className="form-select"
            >
              <option value="">Choose a Model</option>
              {models.map((model, i) => {
                return (
                  <option value={model.id} key={i}>
                    {model.manufacturer.name} : {model.name}
                  </option>
                );
              })}
            </select>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAutosForm;
