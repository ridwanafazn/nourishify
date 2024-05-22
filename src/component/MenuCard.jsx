export default function ({
  isSelected,
  imageUrl,
  nama,
  detail,
  stok,
  ...props
}) {
  return (
    <div
      {...props}
      className="card"
      style={{
        fontFamily: "DM Sans, sans-serif",
        filter: isSelected && "grayscale(80%)",
        display: "flex",
        flexDirection: "column",
        margin: "1.5rem 0",
        textAlign: "center",
        border: "1px solid black",
        borderRadius: "12px",
      }}
    >
      {isSelected && (
        <p
          style={{
            position: "absolute",
            backgroundColor: "red",
            borderRadius: "12px 0 12px 0",
            padding: "0.5rem",
            color: "white",
            fontSize: "small",
          }}
        >
          Dipilih
        </p>
      )}

      <img
        src={imageUrl}
        alt="team"
        style={{
          borderRadius: "12px 12px 0 0",
          width: "300px",
          height: "300px",
        }}
      />
      <div style={{ padding: "1rem 0" }}>
        <h2>{nama}</h2>
        <p>{detail}</p>
        <p>{stok}</p>
      </div>
    </div>
  );
}
