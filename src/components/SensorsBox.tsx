import { Button, ButtonGroup, Card } from "@mui/joy";
import { useEffect, useState } from "react";

import { socket, URL } from "../connection";

const SensorBox = () => {
  const [sensors, setSensors] = useState([]);
  const [sensorValues, setSensorValues] = useState({});

  useEffect(() => {
    const selected = sensors; // This could be configured by some logic
    selected.forEach(({ id }) => {
      socket.on(`sensor-${id}`, ({ value }) => {
        setSensorValues((v) => {
          return { ...v, [id]: value };
        });
      });
    });
  }, [sensors]);

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
          <Card key={sensor.id}>
            <h1>
              <code>{sensor.id}</code>
            </h1>
            <p>{sensorValues[sensor.id] || ""}</p>
          </Card>
        ))}
      </div>
    </>
  );
};

export default SensorBox;
