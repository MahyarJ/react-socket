export function ConnectionState({ id, isConnected }) {
  return (
    <p>
      <code style={{ textTransform: "uppercase" }}>
        {isConnected ? id : ""}
      </code>
    </p>
  );
}
