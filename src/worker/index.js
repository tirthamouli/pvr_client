/**
 * A promise library for JSON parse and stringify using workers
 * Author: Tirthamouli Baidya
 */

// Current number of workers
let numWorkers = 0;

// Default workers and tasks list
const availableWorkers = [];
const tasks = [];

/**
 * Gets a worker from the worker pool
 */
function getWorkerFromPool() {
  // Step 1: Return new promise
  return new Promise(resolve => {
    // Step 1.1: Check if we have available worker
    if (availableWorkers.length > 0) {
      resolve(availableWorkers.pop());
    } else if (numWorkers < process.env.VUE_APP_MAX_WORKERS) {
      resolve(new Worker("/worker.js"));
      numWorkers++;
    } else {
      tasks.push(resolve);
    }
  });
}

/**
 *
 * @param {Object} event
 * @param {Object} currentWorker
 * @param {Function} resolve
 */
function resolveHandler(event, currentWorker, resolve) {
  // Step 1: Resolve the data
  resolve(event.data);

  // Step 2: Remove the event listener
  currentWorker.onmessage = null;

  // Step 3: Check if we have any more tasks
  if (tasks.length > 0) {
    // Call next task
    const task = tasks.shift();
    task(currentWorker);
  } else {
    // Push the worker as available worker
    availableWorkers.push(currentWorker);
  }
}

/**
 * Parse a string to json
 * @param {String} str
 */
export const jsonParse = str => {
  return new Promise(resolve => {
    // Step 1: Check if we can use worker, if not use the default funtion
    if (typeof Worker === "undefined") {
      try {
        resolve(JSON.parse(str));
      } catch {
        resolve({});
      }
    }

    // Step 2: Get worker from worker thread
    getWorkerFromPool()
      .then(currentWorker => {
        // Step 3: Use the worker for the task
        currentWorker.postMessage({
          task: "PARSE",
          value: str
        });

        // Step 4: Add event listener
        currentWorker.onmessage = event => {
          resolveHandler(event, currentWorker, resolve);
        };
      })
      .catch(() => {
        try {
          resolve(JSON.parse(str));
        } catch {
          resolve({});
        }
      });
  });
};

/**
 * Stringify using thread pool
 * @param {Object} obj
 */
export const jsonStringify = obj => {
  return new Promise(resolve => {
    // Step 1: Check if we can use worker, if not use the default funtion
    if (typeof Worker === "undefined") {
      try {
        resolve(JSON.stringify(obj));
      } catch {
        resolve({});
      }
    }

    // Step 2: Get worker from worker thread
    getWorkerFromPool()
      .then(currentWorker => {
        // Step 3: Use the worker for the task
        currentWorker.postMessage({
          task: "STRINGIFY",
          value: obj
        });

        // Step 4: Add event listener
        currentWorker.onmessage = event => {
          resolveHandler(event, currentWorker, resolve);
        };
      })
      .catch(() => {
        try {
          resolve(JSON.stringify(obj));
        } catch {
          resolve({});
        }
      });
  });
};
