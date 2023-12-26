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
import {
  useNodeGetApi,
  useNodePostApi,
  useNodePostImageApi,
} from "@/hooks/useNodeApi.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function page({ params }) {
  const courseId = params.courseId;
  const [pdfUrl, setPdfUrl] = useState("");
  const [riverImages, setRiverImages] = useState(null);

  const [data, setData] = useState({
    title: "init",
    content: "",
    // ...其他数据
  });

  useEffect(() => {
    async function findRiver() {
      try {
        const dbRivers = await useNodePostApi("/api/river/findRiverById", {
          id: courseId,
        });
        const river = dbRivers.data.data;
        console.log(river);
        setData({ ...river });
        if (dbRivers.statusText != "OK") {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        console.log("err", err);
      }
    }
    if (courseId) findRiver();
  }, [courseId]);

  useEffect(() => {
    async function findRiverImage() {
      try {
        const dbRivers = await useNodePostImageApi(
          "/api/river/findRiverImageById",
          {
            id: courseId,
          }
        );
        const imageUrl = URL.createObjectURL(new Blob([dbRivers.data]));
        // console.log("imageUrl", imageUrl, river);

        setRiverImages(imageUrl);
        if (dbRivers.statusText != "OK") {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        console.log("err", err);
      }
    }
    if (courseId) findRiverImage();
  }, [courseId]);

  useEffect(() => {
    if (riverImages)
      setData({
        ...data,
        image: [riverImages],
        qrCodeUrl: `https://tku.river.zhshihpoan.com/students/riverGuides/course/${courseId}`,
      });
  }, [riverImages]);

  useEffect(() => {
    setTimeout(() => {
      if (data.image) generatePdfDocument();
    }, [1500]);
  }, [data]);

  const generatePdfDocument = async () => {
    const blob = await pdf(<PDFViewer data={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };
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
              backgroundColor: "white",
            }}
            placeholder="請輸入内容..."
            value={data.name}
            disabled
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
              backgroundColor: "white",
            }}
            placeholder="請輸入内容..."
            value={data.desc}
            disabled
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
              backgroundColor: "white",
            }}
            placeholder="請輸入内容..."
            value={data._360_url}
            disabled
          />
        </div>
        <div className="flex flex-col w-[100%] lg:w-[50%] gap-2">
          <h2>學習地點照片</h2>
          {data.image ? <img alt="pic" src={data.image} /> : null}
        </div>
        <div className="flex flex-col w-[100%] h-max lg:w-[50%] gap-2">
          <h2>教學文件</h2>
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
      </div>
    </>
  );
}

export default page;
