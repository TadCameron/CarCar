import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import CreateTechnicianForm from "../CreateTechnicianForm";
import DeleteAppForm from "../DeleteAppForm";
import ModifyAppForm from "../ModifyAppForm";

function AppointmentsList() {
  const [apps, setApps] = useState([]);
  const [showForms, setShowForms] = useState({});
  const [vipRef, setVipRef] = useState({});
  const [curForm, setCurForm] = useState(0);
  const [filton, setFilter] = useState("");

  async function is_vip(vin) {
    const response = await fetch(
      `http://localhost:8080/api/service/is_vip/${vin}/`
    );
    if (response.ok) {
      const vip_data = await response.json();
      return vip_data.vip;
    }
  }

  const fetchData = async () => {
    const url = "http://localhost:8080/api/service/appointments/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setApps(data.appointments);
      apps.forEach((app) => {
        const init = { [app.id]: false };
        setShowForms((showForms) => ({
          ...showForms,
          ...init,
        }));
      });

      setCurForm(data.appointments[0].id);
    }
  };

  useEffect(() => {
    fetchData();
    apps.forEach(async (app) => {
      const vip_status = await is_vip(app.vin);
      const init = { [app.id]: vip_status };
      setVipRef((vipRef) => ({
        ...vipRef,
        ...init,
      }));
    });
  }, []);

  const handlePlusClick = useCallback(
    (event) => {
      const index = event.target.value;
      const updatedVal = { [index]: !showForms[index] };
      setShowForms((showForms) => ({
        ...showForms,
        ...updatedVal,
      }));
    },
    [showForms]
  );

  const handleUpdateClick = useCallback((event) => {
    const id = event.target.value;
    setCurForm(id);
  }, []);

  const handleFilterChange = useCallback((event) => {
    const val = event.target.value;
    setFilter(val);
  }, []);

  return [
    [
      <React.StrictMode>
        <CreateTechnicianForm updater={fetchData} />
      </React.StrictMode>,
    ],
    <div className="row rounded-pill shadow">
      <input
        onChange={handleFilterChange}
        className="col-6 rounded-pill"
        placeholder="Search"
      ></input>
    </div>,
    <table key="boobah">
      <thead key="boobah2">
        <tr key="boobah4">
          <th>VIP?</th>
          <th>Customer Name</th>
          <th>Vin</th>
          <th>Time</th>
          <th>Status</th>
          <th>Technician</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody key="boobah3">
        {apps
          .filter((app) => app.vin.toLowerCase().includes(filton))
          .map((app, i) => {
            let deleteB = <div key={`${i}`}></div>;
            let updateB = <div key={`${i}`}></div>;
            let symbol = ``;
            if (showForms[app.id]) {
              symbol = `-`;
              deleteB = [
                <React.StrictMode>
                  <DeleteAppForm app_id={app.id} updater={fetchData} />
                </React.StrictMode>,
              ];
              updateB = [
                <button value={app.id} onClick={handleUpdateClick}>
                  Update
                </button>,
              ];
            } else {
              symbol = `+`;
            }

            return [
              <tr key={i}>
                <td>{vipRef[app.id]}</td>
                <td>{app.customer_name}</td>
                <td>{app.vin}</td>
                <td>{app.datetime}</td>
                <td>{`${app.status}`}</td>
                <td>{app.technician.name}</td>
                <td>
                  <button value={app.id} onClick={handlePlusClick}>
                    {symbol}
                  </button>
                </td>
                <td>{[deleteB]}</td>
                <td>{[updateB]}</td>
              </tr>,
            ];
          })}
      </tbody>
    </table>,
    [
      <React.StrictMode>
        <ModifyAppForm app_id={curForm} />
      </React.StrictMode>,
    ],
  ];
}

export default AppointmentsList;
