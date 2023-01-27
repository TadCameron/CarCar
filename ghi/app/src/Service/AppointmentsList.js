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
  const [btn_symbol, setSymbol] = useState("+");
  const [display, setDisplay] = useState([]);
  const [init, setInit] = useState(true);

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
      setCurForm(data.appointments[0].id);
      setInit(true);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (init) {
    apps.forEach((app) => {
      const init = { [app.id]: false };
      setShowForms((showForms) => ({
        ...showForms,
        ...init,
      }));
    });
    apps.forEach(async (app) => {
      const vip_status = await is_vip(app.vin);
      const init = { [app.id]: vip_status };
      setVipRef((vipRef) => ({
        ...vipRef,
        ...init,
      }));
    });
    setInit(false);
  }

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

  const handleClick = useCallback(
    (event) => {
      if (btn_symbol === "+") {
        setSymbol("-");
        setDisplay([
          <React.StrictMode>
            <CreateTechnicianForm updater={fetchData} />
          </React.StrictMode>,
        ]);
      } else {
        setSymbol("+");
        setDisplay([<div></div>]);
      }
    },
    [btn_symbol]
  );

  return [
    [
      <div className="row align-content-center">
        <div className="col-1 m-4 mt-4" style={{ margin: "0%", width: "4%" }}>
          <div onClick={handleClick} className="btn btn-primary">
            {btn_symbol}
          </div>
        </div>
        {display}
      </div>,
    ],
    <div className="row rounded-pill shadow p-2" style={{ width: "50%" }}>
      <input
        onChange={handleFilterChange}
        className="col rounded-pill"
        placeholder="Search"
      ></input>
    </div>,
    <table key="boobah" className="mt-4 table">
      <thead key="boobah2">
        <tr key="boobah4">
          <th key="th-1">VIP?</th>
          <th key="th-2">Customer Name</th>
          <th key="th-3">Vin</th>
          <th key="th-4">Time</th>
          <th key="th-5">Status</th>
          <th key="th-6">Technician</th>
          <th key="th-7"></th>
          <th key="th-8"></th>
          <th key="th-9"></th>
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
                <button
                  className="btn btn-primary rounded-3"
                  value={app.id}
                  onClick={handleUpdateClick}
                >
                  Update
                </button>,
              ];
            } else {
              symbol = `+`;
            }

            return [
              <tr key={i}>
                <td key={`${i}:col-1`}>{vipRef[app.id]}</td>
                <td key={`${i}:col-2`}>{app.customer_name}</td>
                <td key={`${i}:col-3`}>{app.vin}</td>
                <td key={`${i}:col-4`}>{app.datetime}</td>
                <td key={`${i}:col-5`}>{`${app.status}`}</td>
                <td key={`${i}:col-6`}>{app.technician.name}</td>
                <td key={`${i}:col-7`}>
                  <button
                    key={`${i}:button`}
                    className="btn btn-primary rounded-pill"
                    value={app.id}
                    onClick={handlePlusClick}
                  >
                    {symbol}
                  </button>
                </td>
                <td key={`${i}:col-8`} style={{ margin: "0%", width: "8%" }}>
                  {[deleteB]}
                </td>
                <td key={`${i}:col-9`} style={{ margin: "0%", width: "8%" }}>
                  {[updateB]}
                </td>
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
