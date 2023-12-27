export function ConnectionState({ id, isConnected }) {
  return (
    <code style={{ textTransform: "uppercase" }}>{isConnected ? id : ""}</code>
  );
}
