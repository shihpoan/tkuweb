"use client";
import React, { useEffect, useState } from "react";
import PDFViewer from "@/components/PDFViewer.js";
import { pdf } from "@react-pdf/renderer";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

import { useRecoilState } from "recoil";
import {
  selectedImageState,
  selectedFileState,
} from "@/atoms/selectedImageAtom.js";

import MultiFileUpload from "@/components/MultiFileUpload.js";
import Resizer from "react-image-file-resizer";
import { useNodeGetApi, useNodePostApi } from "@/hooks/useNodeApi.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function page() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [riverPlace, setRiverPlace] = useState("");
  const [riverDesc, setRiverDesc] = useState("");
  const [url360, setUrl360] = useState("");

  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    title: "init",
    content: "",
    // ...其他数据
  });

  const [selectedFiles, setSelectedFiles] = useRecoilState(selectedFileState);
  const [selectedImage, setSelectedImages] = useRecoilState(selectedImageState);

  useEffect(() => {
    setData({
      title: "init",
      content: "",
      // ...其他数据
    });
  }, []);

  useEffect(() => {
    setData({
      name: riverPlace,
      desc: riverDesc,
      qrCodeUrl: "",
      _360_url: url360,
      image: selectedImage,
    });
  }, [riverPlace, riverDesc, url360, selectedImage]);

  useEffect(() => {
    setTimeout(() => {
      if (!data.title) generatePdfDocument();
    }, [1500]);
  }, [data]);

  const generatePdfDocument = async () => {
    const blob = await pdf(<PDFViewer data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
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
          50, // 质量
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
      const response = await fetch(
        "https://tku.node.zhshihpoan.com/upload-multiple",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      // console.log("res", data.files);

      if (response.ok) {
        console.log("Upload successful");
        return data;
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  async function handlsSubmit() {
    let _newDatas = {
      ...data,
      pic_url: "",
      image: null,
    };
    try {
      const images = await handleUpload();
      console.log("images", images);
      images.files.forEach((image) => (_newDatas.pic_url = image.path));
      const returnData = await useNodePostApi("/api/river/newRiver", _newDatas);
      console.log("ok", returnData);
      setData({
        ...data,
        qrCodeUrl: `http://localhost:3000/students/riverGuides/course/${returnData.data.data._id}`,
      });
      setOpen(true);
    } catch (err) {
      console.log("err", err);
    }
  }
  return (
    <>
      <div className="flex flex-col flex-grow w-[100%] h-[100%] text-2xl justify-start items-start lg:items-center px-4 py-4 gap-4 overflow-auto">
        <div className="flex flex-col w-[100%] lg:w-[50%] gap-2">
          <h2>學習地點</h2>
          <TextareaAutosize
            minRows={3}
            style={{
              width: "100%",
              border: "1px solid #125C66",
              borderRadius: "5px",
              color: "black",
              padding: "10px 10px 10px 10px",
            }}
            placeholder="請輸入内容..."
            value={riverPlace}
            onChange={(e) => {
              setRiverPlace(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col w-[100%] lg:w-[50%] gap-2">
          <h2>學習地點介紹</h2>
          <TextareaAutosize
            minRows={10}
            style={{
              width: "100%",
              border: "1px solid #125C66",
              borderRadius: "5px",
              color: "black",
              padding: "10px 10px 10px 10px",
            }}
            placeholder="請輸入内容..."
            value={riverDesc}
            onChange={(e) => {
              setRiverDesc(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col w-[100%] lg:w-[50%] gap-2">
          <h2>360教學環景連結</h2>
          <TextareaAutosize
            minRows={1}
            style={{
              width: "100%",
              border: "1px solid #125C66",
              borderRadius: "5px",
              color: "black",
              padding: "10px 10px 10px 10px",
            }}
            placeholder="請輸入内容..."
            value={url360}
            onChange={(e) => {
              setUrl360(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col w-[100%] lg:w-[50%] gap-2">
          <h2>上傳學習地點照片</h2>
          <MultiFileUpload />
        </div>
        <div className="flex flex-col w-[100%] h-max lg:w-[50%] gap-2">
          <h2>教學文件</h2>
          <div className="flex gap-2">
            {/* <button
              className="w-[50%] h-max bg-white border-[1px] border-gray-700 rounded text-gray-400 p-2"
              onClick={generatePdfDocument}
            >
              預覽教學文件
            </button> */}
            <button
              className="w-[50%] h-max bg-white border-[1px] border-gray-700 rounded text-gray-400 p-2"
              onClick={() => {
                handlsSubmit();
              }}
            >
              建立教學文件
            </button>
          </div>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              提交成功
            </Alert>
          </Snackbar>
        </div>
        {pdfUrl && (
          <div className="w-max h-max">
            <iframe
              src={pdfUrl}
              width="800"
              height="1200"
              style={{ border: "none" }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default page;
