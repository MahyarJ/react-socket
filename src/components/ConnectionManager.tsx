import { Button } from "@mui/joy";
import { socket } from "../connection";

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <Button onClick={socket.connected ? disconnect : connect}>
      {socket.connected ? "Disonnect" : "Connect"}
    </Button>
  );
}
