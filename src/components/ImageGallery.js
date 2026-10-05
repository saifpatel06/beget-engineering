import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";
import styles from "./ImageGallery.module.css";

// Per-service photo gallery.
// images: array of URL strings OR objects { src, alt }. Scales to any number of images
// ("Show more" reveals the rest), and every thumbnail is lazy-loaded.
const ImageGallery = ({ images = [], serviceName = "Project", initialCount = 8, step = 8 }) => {
  const [visible, setVisible] = useState(initialCount);
  const [active, setActive] = useState(-1);

  const items = images.map((image, i) => {
    const src = typeof image === "string" ? image : image.src;
    const alt =
      (typeof image === "object" && image.alt) || `${serviceName} project photo ${i + 1}`;
    return { type: "image", src, alt };
  });

  if (items.length === 0) {
    return <p className={styles.empty}>Photos for this service will be added soon.</p>;
  }

  return (
    <>
      <ul className={styles.grid}>
        {items.slice(0, visible).map((item, i) => (
          <li key={item.src} className={i === 0 ? styles.feature : undefined}>
            <button
              type="button"
              className={styles.thumb}
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1} of ${items.length}: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt=""
                fill
                loading="lazy"
                sizes={
                  i === 0
                    ? "(min-width: 992px) 50vw, 100vw"
                    : "(min-width: 1200px) 25vw, (min-width: 576px) 33vw, 50vw"
                }
                className={styles.image}
              />
            </button>
          </li>
        ))}
      </ul>

      {items.length > visible && (
        <div className={styles.more}>
          <button
            type="button"
            className="bt bt-outline-dark"
            onClick={() => setVisible((count) => count + step)}
          >
            Show more photos ({items.length - visible} more)
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
    </>
  );
};

export default ImageGallery;
