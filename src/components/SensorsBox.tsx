import { Button, ButtonGroup, Card } from "@mui/joy";
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
    <>
      <ButtonGroup color="primary" variant="solid" buttonFlex={1}>
        <Button onClick={getSensorsViaSocket}>Socket | Get Sensors</Button>
        <Button onClick={getSensorsViaREST}>REST | Get Sensors</Button>
      </ButtonGroup>
      <Card>
        {sensors.map((sensor) => (
          <div key={sensor.id}>{sensor.value}</div>
        ))}
      </Card>
    </>
  );
};

export default SensorBox;
