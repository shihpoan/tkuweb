"use client";
import React, { useState } from "react";
import PDFViewer from "@/components/PDFViewer.js";
import { pdf } from "@react-pdf/renderer";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import MultiFileUpload from "@/components/MultiFileUpload.js";

function page() {
  const [pdfUrl, setPdfUrl] = useState("");
  const data = {
    title: "Example Title",
    content: "Here is some example content...",
    // ...其他数据
  };

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
            }}
            placeholder="請輸入内容..."
            // value={executionResults}
            // onChange={(e) => {
            //   setExecutionResults(e.target.value);
            // }}
          />
        </div>
        <div className="flex flex-col w-[100%] lg:w-[50%] gap-2">
          <h2>上傳學習地點照片</h2>
          <MultiFileUpload />
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
            // value={executionResults}
            // onChange={(e) => {
            //   setExecutionResults(e.target.value);
            // }}
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
            // value={executionResults}
            // onChange={(e) => {
            //   setExecutionResults(e.target.value);
            // }}
          />
        </div>
        <div className="flex flex-col w-[100%] lg:w-[50%] gap-2">
          <h2>上傳QrCode</h2>
          <MultiFileUpload />
        </div>
        <div className="flex flex-col w-[100%] h-max lg:w-[50%] gap-2">
          <h2>教學文件</h2>
          <div className="flex gap-2">
            <button
              className="w-[50%] h-max bg-white border-[1px] border-gray-700 rounded text-gray-400 p-2"
              onClick={generatePdfDocument}
            >
              預覽教學文件
            </button>
            <button
              className="w-[50%] h-max bg-white border-[1px] border-gray-700 rounded text-gray-400 p-2"
              // onClick={generatePdfDocument}
            >
              建立教學文件
            </button>
          </div>
        </div>
        {pdfUrl && (
          <div className="w-max h-max">
            <iframe
              src={pdfUrl}
              width="800"
              height="800"
              style={{ border: "none" }}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default page;
