import { useState } from "react";
import { socket } from "../connection";
import { Button, Input } from "@mui/joy";

export function MyForm() {
  const [value, setValue] = useState("");
  const [response, setResponse] = useState("");
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

  return (
    <form onSubmit={onSubmit}>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        endDecorator={<Button disabled={isLoading}>Send to Backend</Button>}
      />
      <p style={{ fontSize: "1rem", paddingTop: "1rem" }}>
        <code>{response || "..."}</code>
      </p>
    </form>
  );
}
