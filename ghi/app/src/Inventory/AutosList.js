import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import CreateAutosForm from "./CreateAutosForm";
import CreateModelForm from "./CreateModelForm";
import CreateManufacturer from "./CreateManufacturer";

function AutosList() {
  const [autos, setAutos] = useState([]);
  const [display_model, setDisplayModel] = useState([]);
  const [btn_symbol_model, setSymbolModel] = useState("+");
  const [display_auto, setDisplayAuto] = useState([]);
  const [btn_symbol_auto, setSymbolAuto] = useState("+");
  const [display_make, setDisplayMake] = useState([])
  const [btn_symbol_make, setSymbolMake] = useState("+")

  const fetchData = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setAutos(data.autos);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickModel = useCallback(
    (event) => {
      if (btn_symbol_model === "+") {
        setSymbolModel("-");
        setDisplayModel([
          <React.StrictMode>
            <CreateModelForm updater={fetchData} />
          </React.StrictMode>,
        ]);
      } else {
        setSymbolModel("+");
        setDisplayModel([<div></div>]);
      }
    },
    [btn_symbol_model]
  );

  const handleClickAuto = useCallback(
    (event) => {
      if (btn_symbol_auto === "+") {
        setSymbolAuto("-");
        setDisplayAuto([
          <React.StrictMode>
            <CreateAutosForm updater={fetchData} />
          </React.StrictMode>,
        ]);
      } else {
        setSymbolAuto("+");
        setDisplayAuto([<div></div>]);
      }
    },
    [btn_symbol_auto]
  );

  const handleClickMake = useCallback(
    (event) => {
      if (btn_symbol_make === "+") {
        setSymbolMake("-");
        setDisplayMake([
          <React.StrictMode>
            <CreateManufacturer updater={fetchData} />
          </React.StrictMode>,
        ]);
      } else {
        setSymbolMake("+");
        setDisplayMake([<div></div>]);
      }
    },
    [btn_symbol_make]
  );

  return [
    <div className="row align-content-center">
      <div className="col-1 m-4 mt-4" style={{ margin: "0%", width: "4%" }}>
        <div onClick={handleClickModel} className="btn btn-primary">
          {btn_symbol_model}
        </div>
      </div>
      {display_model}
    </div>,
    <div className="row align-content-center">
      <div className="col-1 m-4 mt-4" style={{ margin: "0%", width: "4%" }}>
        <div onClick={handleClickAuto} className="btn btn-primary">
          {btn_symbol_auto}
        </div>
      </div>
      {display_auto}
    </div>,
    <div className="row align-content-center">
        <div className="col-1 m-4 mt-4" style={{ margin: "0%", width: "4%" }}>
          <div onClick={handleClickMake} className="btn btn-primary">
            {btn_symbol_make}
          </div>
        </div>
        {display_make}
      </div>,
    <table key="a-1">
      <thead key="a-2">
        <tr key="a-3">
          <th>Image</th>
          <th>Model</th>
          <th>Make</th>
          <th>Year</th>
          <th>Color</th>
          <th>VIN</th>
        </tr>
      </thead>
      <tbody key="a-4">
        {autos.map((auto, i) => {
          const alt_text = `a ${auto.color} ${auto.year} ${auto.model.manufacturer.name} ${auto.model.name}`;
          return [
            <tr key={i}>
              <td style={{ width: "20%" }}>
                <img
                  className="img-fluid"
                  style={{ width: "100%" }}
                  src={auto.model.picture_url}
                  alt={alt_text}
                ></img>
              </td>
              <td>{auto.model.name}</td>
              <td>{auto.model.manufacturer.name}</td>
              <td>{auto.year}</td>
              <td>{auto.color}</td>
              <td>{auto.vin}</td>
            </tr>,
          ];
        })}
      </tbody>
    </table>,
  ];
}

export default AutosList;
