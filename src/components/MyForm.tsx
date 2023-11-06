import { useState } from "react";
import { socket } from "../socket";

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
      <input value={value} onChange={(e) => setValue(e.target.value)} />

      <button type="submit" disabled={isLoading}>
        Submit
      </button>

      <p>
        <code>{response}</code>
      </p>
    </form>
  );
}
