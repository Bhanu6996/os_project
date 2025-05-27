import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AlgorithmPage from "./pages/AlgorithmPage/AlgorithmPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Link to={"/"} className="home-btn" style={{ zIndex: "1" }}>
          Home
        </Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/FCFS"
            element={<AlgorithmPage algorithmName="FCFS" />}
          />
          <Route path="/SJF" element={<AlgorithmPage algorithmName="SJF" />} />
          <Route
            path="/SRTF"
            element={<AlgorithmPage algorithmName="SRTF" />}
          />
          <Route
            path="/Priority"
            element={<AlgorithmPage algorithmName="Priority" />}
          />
          <Route
            path="/RoundRobin"
            element={<AlgorithmPage algorithmName="RoundRobin" />}
          />
          <Route
            path="/MLFQ"
            element={<AlgorithmPage algorithmName="MLFQ" />}
          />
          <Route
            path="/HybridScheduler"
            element={<AlgorithmPage algorithmName="HybridScheduler" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
