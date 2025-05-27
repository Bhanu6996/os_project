import "./AlgorithmPage.css";
import React, { Suspense } from "react";
import OutputCard from "../../components/OutputCard/OutputCard";

import SRTF from "../../algorithms/SRTF.jsx";
import RR from "../../algorithms/RR.jsx";
import SJF from "../../algorithms/SJF.jsx";
import Priority from "../../algorithms/priority.jsx";
import FCFS from "../../algorithms/FCFS.jsx";
import MLFQ from "../../algorithms/MLFQ.jsx";
import HybridScheduler from "../../algorithms/HybridScheduler.jsx";

function selectAlgorithm(algorithmName) {
  const algorithms = {
    SRTF: SRTF,
    RR: RR,
    SJF: SJF,
    Priority: Priority,
    FCFS: FCFS,
    RoundRobin: RR, // Alias for RR
    MLFQ: MLFQ,
    HybridScheduler: HybridScheduler,
  };
  return algorithms[algorithmName];
}

function AlgorithmPage({ algorithmName }) {
  return (
    <div className="algorithm-page-container">
      <div className="algorithm-content">
        <Suspense fallback={<div>Loading...</div>}>
          <OutputCard
            algorithm={algorithmName}
            calculateAlgorithm={selectAlgorithm(algorithmName)} // Pass the loaded algorithm function
          />
        </Suspense>
      </div>
    </div>
  );
}

export default AlgorithmPage;
