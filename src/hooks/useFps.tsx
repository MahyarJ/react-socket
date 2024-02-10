import { useState } from "react";

const useFpsMeter = () => {
  const [fps, setFps] = useState(0);

  // Thanks to https://gist.github.com/medynski/7d11fc15dc460cc68cdf2b93c4a63425
  let prevTime = Date.now(),
    frames = 0;

  const fpsMeter = () => {
    requestAnimationFrame(function loop() {
      const time = Date.now();
      frames++;
      if (time > prevTime + 1000) {
        let fps = Math.round((frames * 1000) / (time - prevTime));
        prevTime = time;
        frames = 0;

        setFps(fps);
      }

      requestAnimationFrame(loop);
    });
  };

  fpsMeter();

  return fps;
};

export default useFpsMeter;
