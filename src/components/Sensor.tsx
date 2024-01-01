import { Card } from "@mui/joy";
import { useEffect, useState } from "react";

import { socket } from "../connection";

const Sensor = ({ id }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    socket.on(`sensor-${id}`, ({ value }) => setValue(value));
    return () => {
      socket.off(`sensor-${id}`);
    };
  }, [id]);

  return (
    <Card key={id}>
      <h1>
        <code>{id}</code>
      </h1>
      <p>{value}</p>
    </Card>
  );
};

export default Sensor;
