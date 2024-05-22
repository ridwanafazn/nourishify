export default function ({ imageUrl, nama, jabatan }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        margin: "1.5rem 0",
        textAlign: "center",
      }}
    >
      <img
        src={imageUrl}
        alt="team"
        style={{ borderRadius: "12px", width: "300px", height: "300px" }}
      />
      <h2>{nama}</h2>
      <p>{jabatan}</p>
    </div>
  );
}
