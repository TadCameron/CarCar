import { useEffect, useState } from 'react';

function VehicleModelsList() {
  const [models, setModels] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8100/api/models/');

    if (response.ok) {
      const data = await response.json();
      setModels(data.models)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Manufacturer</th>
        </tr>
      </thead>
      <tbody>
        {models.map(model => {
          return (
            <tr key={model.id}>
              <td>{model.name}</td>
              <td>{model.manufacturer.name}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}

export default VehicleModelsList;
