import React, { useCallback, useEffect, useRef, useState } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { RecapComposition } from "../remotion/RecapComposition";
import { SCENES, SCENE_STARTS, TOTAL_FRAMES, VIDEO } from "../remotion/config";
import type { RecapData } from "../remotion/schema";

type Props = { data: RecapData; onEdit: () => void };

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

const currentSceneIndex = (frame: number) => {
  let idx = 0;
  for (let i = 0; i < SCENE_STARTS.length; i++) {
    if (frame >= SCENE_STARTS[i]) idx = i;
  }
  return idx;
};

export const StoryPlayer: React.FC<Props> = ({ data, onEdit }) => {
  const playerRef = useRef<PlayerRef>(null);
  const [frame, setFrame] = useState(0);
  const [ended, setEnded] = useState(false);
  const [busy, setBusy] = useState(false);

  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHold = useRef(false);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    let started = false;
    const onFrame = (e: { detail: { frame: number } }) => setFrame(e.detail.frame);
    const onEnded = () => setEnded(true);
    const onPlay = () => {
      started = true;
      setEnded(false);
    };
    player.addEventListener("frameupdate", onFrame);
    player.addEventListener("ended", onEnded);
    player.addEventListener("play", onPlay);

    const retry = setInterval(() => {
      if (started) {
        clearInterval(retry);
        return;
      }
      try {
        player.play();
      } catch {
        /* not ready yet */
      }
    }, 150);
    const stop = setTimeout(() => clearInterval(retry), 3000);

    return () => {
      clearInterval(retry);
      clearTimeout(stop);
      player.removeEventListener("frameupdate", onFrame);
      player.removeEventListener("ended", onEnded);
      player.removeEventListener("play", onPlay);
    };
  }, []);

  const goToScene = useCallback((index: number) => {
    const player = playerRef.current;
    if (!player) return;
    const idx = clamp(index, 0, SCENES.length - 1);
    player.seekTo(SCENE_STARTS[idx]);
    setEnded(false);
    player.play();
  }, []);

  const restart = useCallback(() => goToScene(0), [goToScene]);

  // Share just the summary image — opens the phone's share sheet (WhatsApp, etc.).
  const shareSummary = useCallback(async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      const blob = await res.blob();
      const file = new File([blob], `recap-solo-${data.year}.png`, { type: "image/png" });
      const text = `Anul meu ${data.year} cu SOLO 🚀`;
      const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
      if (nav.canShare && nav.canShare({ files: [file] })) {
        // Native share sheet — user picks WhatsApp and the image is attached.
        await nav.share({ files: [file], title: "Recapul meu SOLO", text });
      } else {
        // Desktop fallback: download the image + open WhatsApp with a message.
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
      }
    } catch {
      /* ignore — user can retry */
    } finally {
      setBusy(false);
    }
  }, [data]);

  const onPointerDown = () => {
    isHold.current = false;
    holdTimer.current = setTimeout(() => {
      isHold.current = true;
      playerRef.current?.pause();
    }, 180);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
    if (isHold.current) {
      playerRef.current?.play();
      return;
    }
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - left) / width;
    const idx = currentSceneIndex(frame);
    if (ratio > 0.5) {
      if (idx >= SCENES.length - 1) {
        playerRef.current?.seekTo(TOTAL_FRAMES - 1);
        setEnded(true);
      } else {
        goToScene(idx + 1);
      }
    } else {
      const intoScene = frame - SCENE_STARTS[idx];
      goToScene(intoScene > VIDEO.fps * 0.8 ? idx : idx - 1);
    }
  };

  const activeIdx = currentSceneIndex(frame);
  // The summary is the last scene — show the actions while it animates (no need to wait for the end).
  const onSummary = activeIdx >= SCENES.length - 1 || ended;

  return (
    <div className="player-shell">
      <div className="progress-row">
        {SCENES.map((s, i) => {
          const fill = i < activeIdx ? 1 : i > activeIdx ? 0 : clamp((frame - SCENE_STARTS[i]) / s.durationInFrames, 0, 1);
          return (
            <div className="progress-track" key={s.id}>
              <div className="progress-fill" style={{ width: `${fill * 100}%` }} />
            </div>
          );
        })}
        <button className="edit-btn" onClick={onEdit} aria-label="Editează datele">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </button>
      </div>

      <div className="player-stage">
        <Player
          ref={playerRef}
          component={RecapComposition}
          inputProps={data}
          durationInFrames={TOTAL_FRAMES}
          compositionWidth={VIDEO.width}
          compositionHeight={VIDEO.height}
          fps={VIDEO.fps}
          style={{ width: "100%", height: "100%" }}
          autoPlay
          initiallyMuted={false}
          controls={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          spaceKeyToPlayOrPause={false}
        />
        {!onSummary ? (
          <div
            className="tap-layer"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerLeave={() => holdTimer.current && clearTimeout(holdTimer.current)}
          />
        ) : null}

        {onSummary ? (
          <div className="end-actions">
            <button className="btn-primary share" onClick={shareSummary} disabled={busy}>
              {busy ? (
                <>
                  <span className="spinner" aria-hidden="true" />
                  Se generează…
                </>
              ) : (
                <>
                  Distribuie prietenilor
                  <span className="btn-arrow" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
                      <polyline points="8 7 12 3 16 7" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </span>
                </>
              )}
            </button>
            <button className="btn-ghost" onClick={restart} disabled={busy}>
              Vezi din nou
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
