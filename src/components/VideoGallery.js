import { useState } from "react";
import Image from "next/image";
import Icon from "./Icons";
import Lightbox from "./Lightbox";
import styles from "./VideoGallery.module.css";

// Video thumbnails that open in a modal player. Nothing is downloaded until a
// video is played, so the page stays fast even with 20+ videos.
// videos: [{ title, src, poster, serviceName? }]
const VideoGallery = ({ videos = [], initialCount = 6, step = 6, dark = false }) => {
  const [visible, setVisible] = useState(initialCount);
  const [active, setActive] = useState(-1);

  // Full title (with service name when known) is used for the player caption + screen readers
  const items = videos.map((video) => ({
    type: "video",
    ...video,
    title: video.serviceName ? `${video.serviceName}: ${video.title}` : video.title,
  }));

  if (items.length === 0) {
    return <p className={styles.empty}>Project videos will be added soon.</p>;
  }

  return (
    <div className={dark ? styles.dark : ""}>
      <ul className={styles.grid}>
        {items.slice(0, visible).map((video, i) => (
          <li key={video.src}>
            <button
              type="button"
              className={styles.card}
              onClick={() => setActive(i)}
              aria-label={`Play video: ${video.title}`}
            >
              <span className={styles.poster}>
                <Image
                  src={video.poster}
                  alt=""
                  fill
                  loading="lazy"
                  sizes="(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className={styles.image}
                />
                <span className={styles.play}>
                  <Icon name="play" size={28} />
                </span>
              </span>
              <span className={styles.caption}>
                {videos[i].serviceName && <span className={styles.service}>{videos[i].serviceName}</span>}
                <span className={styles.title}>{videos[i].title}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {items.length > visible && (
        <div className={styles.more}>
          <button
            type="button"
            className={`bt ${dark ? "bt-outline" : "bt-outline-dark"}`}
            onClick={() => setVisible((count) => count + step)}
          >
            Show more videos ({items.length - visible} more)
          </button>
        </div>
      )}

      {active >= 0 && (
        <Lightbox
          items={items}
          index={active}
          onIndexChange={setActive}
          onClose={() => setActive(-1)}
        />
      )}
    </div>
  );
};

export default VideoGallery;
