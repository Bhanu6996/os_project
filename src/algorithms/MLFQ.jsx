const MLFQ = (processes, quantum = 2) => {
  const n = processes.length;
  let currentTime = 0;
  let completed = 0;
  let result = [];

  // Initialize processes with their properties
  processes = processes.map((p) => ({
    id: p.id,
    arrival: parseInt(p.arrival, 10),
    burst: parseInt(p.burst, 10),
    remaining: parseInt(p.burst, 10),
    completion: 0,
    turnaround: 0,
    waiting: 0,
    priority: 0, // Priority level (0 is highest)
    ganttValues: [],
  }));

  // Sort processes by arrival time
  processes.sort((a, b) => a.arrival - b.arrival);

  // Create priority queues (3 levels)
  const queues = [[], [], []];

  // Helper function to add process to appropriate queue
  const addToQueue = (process) => {
    const level = Math.min(process.priority, 2);
    queues[level].push(process);
  };

  // Helper function to get next process from queues
  const getNextProcess = () => {
    for (let i = 0; i < queues.length; i++) {
      if (queues[i].length > 0) {
        return queues[i].shift();
      }
    }
    return null;
  };

  // Main scheduling loop
  while (completed < n) {
    // Add newly arrived processes to the highest priority queue
    while (processes.length > 0 && processes[0].arrival <= currentTime) {
      const process = processes.shift();
      addToQueue(process);
    }

    // Get the next process to execute
    let currentProcess = getNextProcess();

    if (currentProcess) {
      // Calculate time quantum for this priority level
      const timeQuantum = Math.pow(2, currentProcess.priority) * quantum;
      
      // Execute the process
      const executionTime = Math.min(timeQuantum, currentProcess.remaining);
      currentProcess.ganttValues.push([currentTime, currentTime + executionTime]);
      
      currentTime += executionTime;
      currentProcess.remaining -= executionTime;

      if (currentProcess.remaining === 0) {
        // Process completed
        currentProcess.completion = currentTime;
        currentProcess.turnaround = currentProcess.completion - currentProcess.arrival;
        currentProcess.waiting = currentProcess.turnaround - currentProcess.burst;
        result.push(currentProcess);
        completed++;
      } else {
        // Process not completed, demote to lower priority
        currentProcess.priority++;
        addToQueue(currentProcess);
      }
    } else {
      // No process available, increment time
      currentTime++;
    }
  }

  return result;
};

export default MLFQ; 