import ThreeComponent from "./ThreeJS";

function App() {
  return (
    <>
    <ThreeComponent />
      <canvas className="canvas"></canvas>
      <div
        style={{ position: "absolute", bottom: "7rem", width: "100%" }}
        className="okokok"
      >
        <h1 style={{ color: "#fff", textAlign: "center" }} className="textcin">
          The ultimate developer.
        </h1>
      </div>
    </>
  );
}

export default App;
