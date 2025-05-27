const HybridScheduler = (processes, quantum = 2) => {
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
    priority: parseInt(p.priority || 0, 10),
    responseRatio: 0,
    ganttValues: [],
  }));

  // Sort processes by arrival time initially
  processes.sort((a, b) => a.arrival - b.arrival);

  // Create queues for different scheduling strategies
  const highPriorityQueue = []; // For SJF and Priority
  const normalQueue = [];      // For Round Robin
  const lowPriorityQueue = []; // For FCFS

  // Helper function to calculate response ratio
  const calculateResponseRatio = (process) => {
    const waitingTime = currentTime - process.arrival;
    return (waitingTime + process.remaining) / process.remaining;
  };

  // Helper function to add process to appropriate queue
  const addToQueue = (process) => {
    // Calculate response ratio
    process.responseRatio = calculateResponseRatio(process);

    // Determine which queue to add the process to
    if (process.remaining <= quantum) {
      // Short processes go to high priority queue (SJF-like)
      highPriorityQueue.push(process);
      highPriorityQueue.sort((a, b) => a.remaining - b.remaining);
    } else if (process.priority > 0) {
      // Processes with priority go to normal queue (Priority-like)
      normalQueue.push(process);
      normalQueue.sort((a, b) => a.priority - b.priority);
    } else {
      // Long processes go to low priority queue (FCFS-like)
      lowPriorityQueue.push(process);
    }
  };

  // Helper function to get next process to execute
  const getNextProcess = () => {
    // First check high priority queue (SJF)
    if (highPriorityQueue.length > 0) {
      return highPriorityQueue.shift();
    }
    // Then check normal queue (Priority)
    if (normalQueue.length > 0) {
      return normalQueue.shift();
    }
    // Finally check low priority queue (FCFS)
    if (lowPriorityQueue.length > 0) {
      return lowPriorityQueue.shift();
    }
    return null;
  };

  // Main scheduling loop
  while (completed < n) {
    // Add newly arrived processes
    while (processes.length > 0 && processes[0].arrival <= currentTime) {
      const process = processes.shift();
      addToQueue(process);
    }

    // Get the next process to execute
    let currentProcess = getNextProcess();

    if (currentProcess) {
      // Determine execution time based on queue type
      let executionTime;
      if (highPriorityQueue.includes(currentProcess)) {
        // For high priority queue, execute until completion (SJF-like)
        executionTime = currentProcess.remaining;
      } else if (normalQueue.includes(currentProcess)) {
        // For normal queue, use time quantum (Round Robin-like)
        executionTime = Math.min(quantum, currentProcess.remaining);
      } else {
        // For low priority queue, use longer time quantum (FCFS-like)
        executionTime = Math.min(quantum * 2, currentProcess.remaining);
      }

      // Execute the process
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
        // Process not completed, add back to appropriate queue
        addToQueue(currentProcess);
      }
    } else {
      // No process available, increment time
      currentTime++;
    }
  }

  return result;
};

export default HybridScheduler; 