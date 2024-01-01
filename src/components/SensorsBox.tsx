import { Button, ButtonGroup } from "@mui/joy";
import { useState } from "react";

import { socket, URL } from "../connection";
import SensorCard from "./SensorCard";

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
    <>
      <ButtonGroup color="primary" variant="solid" buttonFlex={1}>
        <Button onClick={getSensorsViaSocket}>Socket | Get Sensors</Button>
        <Button onClick={getSensorsViaREST}>REST | Get Sensors</Button>
      </ButtonGroup>
      <div className="SensorGroup">
        {sensors.map((sensor) => (
          <SensorCard id={sensor.id} />
        ))}
      </div>
    </>
  );
};

export default SensorBox;
