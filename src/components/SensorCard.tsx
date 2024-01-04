import { useState } from "react";
import { Card, CircularProgress } from "@mui/joy";

import Sensor from "./Sensor";

const SensorCard = ({ id }) => {
  const [delay, setDelay] = useState(0);

  const handleDelay = () => {
    setDelay((prev) => (prev < 100 ? prev + 25 : 0));
  };

  const disabled = delay === 100;

  return (
    <Card sx={{ opacity: disabled ? 0.5 : 1 }}>
      <CircularProgress
        size="sm"
        variant={disabled ? "solid" : "soft"}
        thickness={4}
        determinate
        value={100 - delay}
        onClick={handleDelay}
      />
      <h1>
        <code>{id}</code>
      </h1>
      <Sensor id={id} delay={delay * 20} disabled={disabled} />
    </Card>
  );
};

export default SensorCard;
