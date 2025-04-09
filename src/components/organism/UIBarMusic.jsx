import React, { useState, useEffect, useRef } from 'react';

export default function UIBarMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(80);
  const duration = 110;
  const intervalRef = useRef(null);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleVolume = () => setShowVolume(!showVolume);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            clearInterval(intervalRef.current);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const formatTime = (secs) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const width = e.target.offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    const percent = clickX / width;
    setCurrentTime(Math.floor(duration * percent));
  };

  return (
    <div className="relative w-full bg-gray-100 px-4 py-2 flex items-center justify-between text-sm font-medium">

      <div className="flex items-center space-x-2">
        <button title="Anterior">⏮️</button>
        <button onClick={togglePlay} title="Play/Pause">
          {isPlaying ? '⏸️' : '▶️'}
        </button>
        <button title="Aleatorio">🔀</button>
        <button title="Repetir">🔁</button>
      </div>

      <div className="flex items-center space-x-2 flex-grow mx-6 select-none">
        <span className="text-orange-500 text-xs">{formatTime(currentTime)}</span>
        <div
          className="relative w-full h-1 bg-gray-300 rounded cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="absolute top-0 left-0 h-1 bg-orange-500 rounded"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          <div
            className="absolute -top-1.5 w-3 h-3 bg-orange-500 rounded-full"
            style={{
              left: `calc(${(currentTime / duration) * 100}% - 6px)`
            }}
          />
        </div>
        <span className="text-xs text-gray-600">{formatTime(duration)}</span>
      </div>

      <div className="relative flex items-center space-x-2">
        <button onClick={toggleVolume} title="Volumen">🔊</button>

        {showVolume && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded p-2">
            <div className="h-32 w-4 relative flex items-center justify-center">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                className="absolute left-1/2 transform -translate-x-1/2 rotate-[-90deg] w-32 accent-orange-500"
              />
            </div>
          </div>
        )}

        <img
          src="https://i.scdn.co/image/ab67616d0000b273347f12d2dc6e9e765e8aa7c6"
          alt="cover"
          className="w-8 h-8 rounded"
        />
        <div className="text-xs leading-tight">
          <p className="font-semibold">girl in red</p>
          <p className="text-gray-500">4am</p>
        </div>
      </div>

      <div className="flex items-center space-x-3 ml-4">
        <button title="Me gusta">❤️</button>
        <button title="Compartir">📤</button>
        <button title="Lista">📃</button>
      </div>
    </div>
  );
}
