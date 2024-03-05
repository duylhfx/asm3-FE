function PageNotFound() {
  const notfound = {
    height: "40vh",
    display: "grid",
    textAlign: "center",
    fontSize: "28px",
    marginTop: "20%",
  };
  return (
    <div style={notfound}>
      <h2>Page Not Found!</h2>
    </div>
  );
}

export default PageNotFound;
