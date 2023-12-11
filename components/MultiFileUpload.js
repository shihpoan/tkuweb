// components/MultiFileUpload.js
"use client";
// client/components/MultiFileUpload.js
import React, { useState, useE } from "react";
import Resizer from "react-image-file-resizer";

const MultiFileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      // 设定文件大小阈值，比如 1MB
      const SIZE_THRESHOLD = 3 * 1024 * 1024; // 1MB in bytes

      // 获取图片的原始格式（例如 "image/jpeg"）
      const outputFormat =
        file.type.split("/")[1].toUpperCase() === "PNG" ? "PNG" : "JPEG";

      // 检查文件大小
      if (file.size > SIZE_THRESHOLD) {
        // 如果文件大小超过阈值，进行压缩
        Resizer.imageFileResizer(
          file,
          800, // 可以调整为适合的尺寸
          600, // 可以调整为适合的尺寸
          outputFormat,
          75, // 质量
          0, // 旋转
          (uri) => {
            resolve(uri);
          },
          "file" // 输出类型
        );
      } else {
        // 文件大小在阈值以下，不进行压缩
        resolve(file);
      }
    });

  const handleUpload = async () => {
    const resizedImages = await Promise.all(
      selectedFiles.map((file) => resizeFile(file))
    );

    const formData = new FormData();
    resizedImages.forEach((file) => {
      formData.append("photos", file);
    });

    try {
      const response = await fetch("http://localhost:8000/upload-multiple", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("res", data.files);

      if (response.ok) {
        console.log("Upload successful");
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <label className="flex text-sm justify-between items-center">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block file:w-[30%] file:h-max file:bg-white file:border-[1px] file:border-gray-700 file:rounded file:text-gray-400 file:p-2"
      />
      <button
        onClick={handleUpload}
        className="block w-[30%] h-max bg-white border-[1px] border-gray-700 rounded text-gray-400 p-2"
      >
        上傳
      </button>
    </label>
  );
};

export default MultiFileUpload;
