import React, { useState, useEffect } from "react";

interface ITimer {
    minutes: number;
    seconds: number;
}

function Timer({minutes, seconds}: ITimer) {
  const [totalSeconds, setTotalSeconds] = useState(minutes * 60 + seconds);

  useEffect(() => {
    let interval: any = null;
    if (totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [totalSeconds]);

  const minutesRemaining = Math.floor(totalSeconds / 60);
  const secondsRemaining = totalSeconds % 60;

  return (
    <div>
      { totalSeconds ? 
        <h2>{`${minutesRemaining
          .toString()
          .padStart(2, "0")}:${secondsRemaining.toString().padStart(2, "0")}`}
        </h2>
      : <h3>На жаль час вичерпано</h3>
      }
        
    </div>
  );
}

export default Timer;
