// src/utils/timer.js

// Function to start a countdown timer
export const startTimer = (initialTime, onTimeUp, onTick) => {
    let timeLeft = initialTime;
    let timerId;
  
    // Function to update the timer each second
    const tick = () => {
      if (timeLeft > 0) {
        timeLeft--;
        onTick(timeLeft); // Callback to update the UI with time left
      } else {
        clearInterval(timerId); // Stop the timer
        onTimeUp(); // Callback when time is up
      }
    };
  
    // Start the timer
    timerId = setInterval(tick, 1000);
  
    // Return a function to stop the timer if needed
    const stopTimer = () => {
      clearInterval(timerId);
    };
  
    return stopTimer;
  };
  