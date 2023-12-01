import { useState } from "react";
import { socket, URL } from "../connection";

export function MyForm() {
  const [value, setValue] = useState("");
  const [response, setResponse] = useState("");
  const [sensors, setSensors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.emit("do-some", value, (res) => {
      setIsLoading(false);
      setValue("");
      setResponse(res);
    });
  }

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
    <form onSubmit={onSubmit}>
      <input value={value} onChange={(e) => setValue(e.target.value)} />

      <button type="submit" disabled={isLoading}>
        Submit
      </button>
      <p>
        <code>{response}</code>
      </p>
      <button type="button" onClick={getSensorsViaSocket}>
        Get Sensors via Socket
      </button>
      <button type="button" onClick={getSensorsViaREST}>
        Get Sensors via REST
      </button>
      {sensors.map((sensor) => (
        <div key={sensor.id}>{sensor.name}</div>
      ))}
    </form>
  );
}
