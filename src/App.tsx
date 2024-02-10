import { useEffect, useState } from "react";
import { useColorScheme } from "@mui/joy/styles";

import "./App.css";
import { socket } from "./connection";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import { Events } from "./components/Events";
import { MyForm } from "./components/MyForm";
import SensorBox from "./components/SensorsBox";
import useFpsMeter from "./hooks/useFps";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const { setMode } = useColorScheme();

  useEffect(() => {
    setMode("dark");
  }, [setMode]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  const fps = useFpsMeter();

  return (
    <div className="App">
      <h3>{fps}</h3>
      <section className="Container" style={{ width: 350 }}>
        <header className="App-header">
          <ConnectionManager />
          <ConnectionState id={socket.id} isConnected={isConnected} />
        </header>
        <Events events={fooEvents} />
        <MyForm />
        <SensorBox />
      </section>
    </div>
  );
}

export default App;
