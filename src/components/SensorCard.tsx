import { Card } from "@mui/joy";

import Sensor from "./Sensor";

const SensorCard = ({ id }) => {
  return (
    <Card key={id}>
      <h1>
        <code>{id}</code>
      </h1>
      <Sensor id={id} />
    </Card>
  );
};

export default SensorCard;
