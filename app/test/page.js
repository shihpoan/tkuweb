"use client";
import React, { useState, useEffect, useRef } from "react";

function Camera() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          // 将视频流赋值给video标签的srcObject
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error accessing the camera", error);
        });
    }
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay />
    </div>
  );
}
useEffect(() => {
  let stream;

  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((s) => {
      stream = s;
      videoRef.current.srcObject = stream;
    })
    .catch((error) => {
      console.error("Error accessing the camera", error);
    });

  return () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };
}, []);

<div>
  <h1>Camera Access with Next.js</h1>
  <Camera />
</div>;
