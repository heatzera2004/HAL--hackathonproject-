// src/components/VideoPage.js
import React from 'react';
import ReactPlayer from 'react-player';

const Video = ({ videoUrl, topic, description }) => {
  return (
    <div className="bg-green-50 min-h-screen flex flex-col items-center justify-center p-6">
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-5xl w-full">
      <h1 className="text-4xl font-bold text-green-700 mb-4">{topic}</h1>
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <ReactPlayer 
          url={videoUrl} 
          controls 
          width='100%' 
          height='100%' 
          className="absolute top-0 left-0 rounded-lg"
        />
      </div>
      {description && (
        <p className="mt-4 text-gray-700 text-lg">{description}</p>
      )}
    </div>
  </div>
  );
};

export default Video;
