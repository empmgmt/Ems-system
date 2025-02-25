export const style3 = {
  chatContainer: {
    width: "450px",
    height: "570px", // Increased height
    margin: "10px auto", // Centers the chat box and reduces top spacing
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  chatTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "24px",
    marginBottom: "10px",
  },

  chatBox: {
    height: "400px",
    width: "100%",
    overflowY: "auto",
    marginBottom: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.1)",
  },

  adminMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    borderRadius: "12px 12px 0 12px",
    maxWidth: "70%",
    wordWrap: "break-word",
  },

  userMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px",
    borderRadius: "12px 12px 12px 0",
    maxWidth: "70%",
    wordWrap: "break-word",
  },

  chatInput: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "14px",
  },

  button: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    transition: "background 0.3s",
  },

  clearButton: {
    padding: "8px 12px",
    backgroundColor: "#dc3545", // Red color for clear button
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px",
    transition: "background 0.3s",
  },
};
