import { useCallback, useState } from "react";

function CreateTechnicianForm(props) {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("+")
  const [display, setDisplay] = useState([])
  const handleNameChange = useCallback((event) => {
    const val = event.target.value;
    setName(val);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:8080/api/service/technicians/";

    const data = { name: name };
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const createdTechy = await response.json();
      
      setName("");
      event.target.reset();
      props.updater()
    }
  };

  return (
      <form
        onSubmit={handleSubmit}
        className="col shadow mt-4 rounded-pill float-center"
      >
        <div className="row justify-items-center p-1 ">
          <div className="col-sm-2 align-self-center" style={{ margin: "0%", width: "13%" }}>
            <label
              className="text-shadow"
              htmlFor="name"
            >
              New Technician:
            </label>
          </div>
          <div className="col-sm-8">
            <input
              onChange={handleNameChange}
              className="form-control"
              required
              placeholder="Name"
              type="text"
              name="name"
              id="name"
            ></input>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary mb-2">
              Create
            </button>
          </div>
        </div>
      </form>
  );
}

export default CreateTechnicianForm;
