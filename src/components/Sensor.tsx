import { useEffect, useState } from "react";
import throttle from "lodash/throttle";

import { socket } from "../connection";

type SensorProps = {
  id: string;
  disabled?: boolean;
  delay?: number;
};

const Sensor = ({ id, delay, disabled }: SensorProps) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const throttleSet = throttle(setValue, delay);
    socket.on(`sensor-${id}`, ({ value }) => !disabled && throttleSet(value));
    return () => {
      socket.off(`sensor-${id}`);
    };
  }, [id, disabled, delay]);

  return <p>{value}</p>;
};

export default Sensor;
