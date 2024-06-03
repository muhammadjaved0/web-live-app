const ChatBox = (props:any) => {
    const {name , image , message} = props
  return (
    <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
      <img
        src={image}
        width={32}
        height={32}
        style={{
          borderRadius: "50%",
          marginBottom: "auto",
        }}
      />
      <div
        style={{
          padding: "6px 8px 6px 8px",
          borderRadius: "8px",
          background: "#00000080",
          width: "150px",
        }}
      >
        <h3
          style={{
            fontWeight: 700,
            fontSize: "11px",
            color: "#EAD7AE",
            margin: 0,
          }}
        >
          {name}
        </h3>
        <h3
          style={{
            fontWeight: 400,
            fontSize: "11px",
            color: "white",
            margin: 0,
            marginTop: "6px",
          }}
        >
          {message}
        </h3>
      </div>
    </div>
  );
};

export default ChatBox;
