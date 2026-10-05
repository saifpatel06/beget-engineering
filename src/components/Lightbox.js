import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Icon from "./Icons";
import styles from "./Lightbox.module.css";

// Accessible modal viewer for images AND videos.
// items: [{ type: "image" | "video", src, alt?, title?, poster? }]
// Keyboard: Esc closes, ← → navigate, Tab is trapped inside. Touch: swipe left/right.
const Lightbox = ({ items, index, onClose, onIndexChange }) => {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const touchStartX = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const item = items[index];
  const total = items.length;
  const canFullscreen = typeof document !== "undefined" && !!document.fullscreenEnabled;

  const goPrev = useCallback(() => onIndexChange((index - 1 + total) % total), [index, total, onIndexChange]);
  const goNext = useCallback(() => onIndexChange((index + 1) % total), [index, total, onIndexChange]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      dialogRef.current?.requestFullscreen?.();
    }
  };

  // Lock page scroll, move focus in, and restore focus on close
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      if (document.fullscreenElement) document.exitFullscreen?.();
      previouslyFocused?.focus?.();
    };
  }, []);

  useEffect(() => {
    setVideoFailed(false);
  }, [index]);

  // Keyboard handling + focus trap
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        goPrev();
      } else if (event.key === "ArrowRight") {
        goNext();
      } else if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button:not([disabled]), [href], video[controls], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, goPrev, goNext]);

  const onTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 50) {
      delta > 0 ? goPrev() : goNext();
    }
  };

  if (!item || typeof document === "undefined") return null;

  const label = item.type === "video" ? "Video viewer" : "Image viewer";

  return createPortal(
    <div
      ref={dialogRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className={styles.toolbar}>
        <p className={styles.counter} aria-live="polite">
          {index + 1} / {total}
        </p>
        <div className={styles.toolbarActions}>
          {canFullscreen && (
            <button type="button" className={styles.iconButton} onClick={toggleFullscreen}>
              <Icon name={isFullscreen ? "shrink" : "expand"} size={22} />
              <span className="visually-hidden">
                {isFullscreen ? "Exit full screen" : "Full screen"}
              </span>
            </button>
          )}
          <button ref={closeRef} type="button" className={styles.iconButton} onClick={onClose}>
            <Icon name="close" size={24} />
            <span className="visually-hidden">Close</span>
          </button>
        </div>
      </div>

      <div className={styles.stageRow} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {total > 1 && (
          <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={goPrev}>
            <Icon name="chevronLeft" size={28} />
            <span className="visually-hidden">Previous</span>
          </button>
        )}

        <div className={styles.stage}>
          {item.type === "video" ? (
            videoFailed ? (
              <div className={styles.missing} role="status">
                <p>This video is not available yet.</p>
                <p className={styles.missingPath}>Expected file: {item.src}</p>
              </div>
            ) : (
              <video
                key={item.src}
                className={styles.video}
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={item.poster}
                onError={() => setVideoFailed(true)}
              >
                <source src={item.src} type="video/mp4" onError={() => setVideoFailed(true)} />
                Your browser does not support HTML video.
              </video>
            )
          ) : (
            <Image
              key={item.src}
              src={item.src}
              alt={item.alt || ""}
              fill
              sizes="100vw"
              className={styles.image}
            />
          )}
        </div>

        {total > 1 && (
          <button type="button" className={`${styles.nav} ${styles.next}`} onClick={goNext}>
            <Icon name="chevronRight" size={28} />
            <span className="visually-hidden">Next</span>
          </button>
        )}
      </div>

      {(item.title || item.alt) && <p className={styles.caption}>{item.title || item.alt}</p>}
    </div>,
    document.body
  );
};

export default Lightbox;
