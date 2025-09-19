import React from 'react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  return (
    <video
      key={src} // Add key to force re-render when src changes
      className="w-full rounded-lg aspect-video bg-gray-200 dark:bg-gray-700"
      controls
      poster={poster || 'https://picsum.photos/seed/video-poster/400/225'}
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
