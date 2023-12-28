import { useState } from "react";
import { socket } from "../connection";
import { Button, Input, Snackbar } from "@mui/joy";

export function MyForm() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState({ endpoint: "", value: [] });
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.emit("set-sensors", value, (res) => {
      setIsLoading(false);
      setOpen(true);
      setValue("");
      setResponse(res);
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <Input
        placeholder="How many sensors..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        endDecorator={<Button disabled={isLoading}>Set Sensors</Button>}
      />
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div>
          <p>
            <code>{`⚡️ server > ${response.endpoint}`}</code>
          </p>
          <p style={{ fontSize: "1rem" }}>
            <code>{response.value} sensors are set</code>
          </p>
        </div>
      </Snackbar>
    </form>
  );
}
