import { useEffect, useState } from "react";

import "./App.css";
import { socket } from "./connection";
import { ConnectionState } from "./components/ConnectionState";
import { ConnectionManager } from "./components/ConnectionManager";
import { Events } from "./components/Events";
import { MyForm } from "./components/MyForm";
import SensorBox from "./components/SensorsBox";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

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

  return (
    <div className="App">
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
