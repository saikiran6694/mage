import "./App.css";
import ReactIcon from "./logo.svg";

function App() {
  return (
    <div
      style={{
        border: "1px solid #000",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        zIndex: "100000",
      }}
    >
      <img src={ReactIcon} alt="icon" width={54} height={54} />
    </div>
  );
}

export default App;
