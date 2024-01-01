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

  return <p>{value}</p>;
};

export default Sensor;
