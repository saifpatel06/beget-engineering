import SectionHeading from "./SectionHeading";
import VideoGallery from "./VideoGallery";

// Home page video showcase. Thumbnails only: videos load when a person presses play.
const VideoSection = ({
  videos = [],
  title = "See our work in action",
  intro = "Watch selected projects from our sites and workshop. Videos load only when you press play.",
}) => {
  return (
    <section id="videos" className="section section-dark dark" aria-labelledby="videos-title">
      <div className="wrap">
        <SectionHeading id="videos-title" title={title} intro={intro} dark />
        <VideoGallery videos={videos} initialCount={6} dark />
      </div>
    </section>
  );
};

export default VideoSection;
