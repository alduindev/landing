import React, { useRef, useState, useEffect } from "react";

export default function UIMediaPlayer() {
  const mediaRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  const itemRefs = useRef([]); // ✅ Referencias a cada ítem

  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeatOne, setRepeatOne] = useState(false);
  const [repeatAll, setRepeatAll] = useState(false);
  const [mediaView, setMediaView] = useState("audio");

  const currentMedia = playlist[currentIndex] || {};
  const isAudio = currentMedia?.type?.startsWith("audio");
  const isVideo = currentMedia?.type?.startsWith("video");

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const handleTimeUpdate = () => {
      setProgress(media.currentTime);
      setDuration(media.duration || 0);
    };

    const handleEnd = () => {
      if (repeatOne) {
        media.currentTime = 0;
        media.play();
      } else if (repeatAll || currentIndex + 1 < playlist.length) {
        playNext();
      } else {
        setPlaying(false);
      }
    };

    media.volume = volume;
    media.addEventListener("timeupdate", handleTimeUpdate);
    media.addEventListener("ended", handleEnd);

    return () => {
      media.removeEventListener("timeupdate", handleTimeUpdate);
      media.removeEventListener("ended", handleEnd);
    };
  }, [currentIndex, repeatOne, repeatAll, volume]);

  const formatTime = (t) => {
    if (!t || isNaN(t)) return "00:00";
    const m = Math.floor(t / 60).toString().padStart(2, "0");
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const togglePlay = () => {
    const media = mediaRef.current;
    if (!media) return;
    playing ? media.pause() : media.play();
    setPlaying(!playing);
  };

  const playNext = () => {
    setCurrentIndex((prev) => (prev + 1) % playlist.length);
    setPlaying(false);
  };

  const playPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setPlaying(false);
  };

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const newTime = ((e.clientX - rect.left) / rect.width) * duration;
    mediaRef.current.currentTime = newTime;
  };

  const handleVolumeClick = (e) => {
    const rect = volumeRef.current.getBoundingClientRect();
    const newVol = (e.clientX - rect.left) / rect.width;
    setVolume(Math.max(0, Math.min(1, newVol)));
  };

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newList = files.map((file) => ({
      name: file.name,
      src: URL.createObjectURL(file),
      type: file.type,
    }));
    setPlaylist((prev) => [...prev, ...newList]);
  };

  const handleRemove = (index) => {
    const updated = playlist.filter((_, i) => i !== index);
    setPlaylist(updated);
    if (index === currentIndex) {
      setCurrentIndex(0);
      setPlaying(false);
    }
  };

  const MediaList = ({ type }) => {
    const filtered = playlist.filter((m) => m.type.startsWith(type));
    return (
      <div className="bg-neutral-800 text-white p-4 rounded-lg max-h-64 overflow-y-auto">
        {filtered.map((item, i) => {
          const realIndex = playlist.findIndex((p) => p.name === item.name);
          const isCurrent = realIndex === currentIndex;
          const isSelected = realIndex === selectedIndex;

          return (
            <div
              key={i}
              ref={(el) => (itemRefs.current[realIndex] = el)} // ✅ Guarda la ref
              className={`flex justify-between items-center px-2 py-1 rounded cursor-pointer
              ${isCurrent ? "bg-green-600" : isSelected ? "bg-neutral-700" : "hover:bg-neutral-700"}`}
              onClick={() => {
                setSelectedIndex(realIndex);
                itemRefs.current[realIndex]?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
              onDoubleClick={() => {
                setCurrentIndex(realIndex);
                setPlaying(true);
                itemRefs.current[realIndex]?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            >
              <span className="truncate text-sm">
                {type === "audio" ? "🎵" : "🎥"} {item.name}
              </span>
              <button onClick={() => handleRemove(realIndex)}>🗑</button>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-neutral-900 text-white rounded-xl shadow-lg space-y-6">
      <h1 className="text-center text-2xl font-bold">🎧 UIMediaPlayer</h1>

      {/* Switch */}
      <div className="flex justify-center gap-4">
        {["audio", "video"].map((view) => (
          <button
            key={view}
            onClick={() => setMediaView(view)}
            className={`px-4 py-2 rounded-full text-sm font-medium
            ${mediaView === view ? "bg-green-600" : "bg-neutral-700"}`}
          >
            {view === "audio" ? "🎵 Música" : "🎥 Videos"}
          </button>
        ))}
      </div>

      <MediaList type={mediaView} />

      {currentMedia.src && (
        <div className="space-y-3">
          {isVideo && (
            <video
              ref={mediaRef}
              src={currentMedia.src}
              className="w-full rounded-lg"
              controls={false}
              autoPlay
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
          )}
          {isAudio && (
            <audio
              ref={mediaRef}
              src={currentMedia.src}
              autoPlay
              hidden
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
          )}
          <p className="text-center text-sm">{currentMedia.name}</p>

          {/* Barra de progreso */}
          <div className="text-xs flex justify-between">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div
            ref={progressRef}
            onClick={handleProgressClick}
            className="w-full h-2 bg-neutral-700 rounded relative cursor-pointer"
          >
            <div
              className="h-full bg-green-600 rounded"
              style={{ width: `${(progress / duration) * 100 || 0}%` }}
            />
            <div
              className="w-4 h-4 bg-green-500 border border-white rounded-full absolute -top-1 -translate-x-1/2"
              style={{ left: `${(progress / duration) * 100 || 0}%` }}
            />
          </div>

          {/* Controles */}
          <div className="flex justify-center gap-6 text-2xl">
            <button onClick={() => setRepeatOne(!repeatOne)}>🔂</button>
            <button onClick={playPrev}>⏮</button>
            <button onClick={togglePlay}>
              {playing ? "⏸️" : "▶️"}
            </button>
            <button onClick={playNext}>⏭</button>
            <button onClick={() => setRepeatAll(!repeatAll)}>🔁</button>
          </div>

          {/* Volumen */}
          <div className="flex items-center gap-2">
            <span className="text-xs">VOL</span>
            <div
              ref={volumeRef}
              onClick={handleVolumeClick}
              className="w-40 h-2 bg-neutral-700 rounded relative cursor-pointer"
            >
              <div
                className="h-full bg-green-600 rounded"
                style={{ width: `${volume * 100}%` }}
              />
              <div
                className="w-4 h-4 bg-green-500 border border-white rounded-full absolute -top-1 -translate-x-1/2"
                style={{ left: `${volume * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Subir archivos */}
      <div className="text-center mt-4">
        <label
          htmlFor="upload"
          className="cursor-pointer px-4 py-2 bg-green-600 rounded-full hover:bg-green-700"
        >
          +
        </label>
        <input
          id="upload"
          type="file"
          multiple
          accept="audio/*,video/*"
          onChange={handleUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
