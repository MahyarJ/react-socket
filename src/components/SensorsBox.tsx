import { Button } from "@mui/joy";
import { useState } from "react";

import { socket, URL } from "../connection";

const SensorBox = () => {
  const [sensors, setSensors] = useState([]);

  const getSensorsViaSocket = () => {
    socket.emit("get-sensors", (res) => {
      setSensors(res);
    });
  };

  const getSensorsViaREST = async () => {
    const response = await fetch(`${URL}/sensors`);
    const sensors = await response.json();
    setSensors(sensors);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button onClick={getSensorsViaSocket}>Socket | Get Sensors</Button>
      <Button onClick={getSensorsViaREST}>REST | Get Sensors</Button>
      {sensors.map((sensor) => (
        <div key={sensor.id}>{sensor.name}</div>
      ))}
    </div>
  );
};

export default SensorBox;
