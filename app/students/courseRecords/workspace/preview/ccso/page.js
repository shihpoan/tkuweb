"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
// import { useToast } from "@chakra-ui/react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Image from "next/image.js";

import { useRecoilState, useRecoilValue } from "recoil";
import { getCookies } from "cookies-next";
import Resizer from "react-image-file-resizer";

import {
  autoCompleteTextFieldState,
  executionResultsState,
  picDescState,
  studentInsightsState,
} from "@/atoms/ccsoTempDatasAtoms.js";
import {
  selectedImageState,
  selectedFileState,
} from "@/atoms/selectedImageAtom.js";
import { useNodeGetApi, useNodePostApi } from "@/hooks/useNodeApi.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const _id = searchParams.get("id");
  const teacher_id = searchParams.get("teacher_id");

  const cookies = getCookies();

  const [open, setOpen] = useState(false);

  const autoCompleteTextField = useRecoilValue(autoCompleteTextFieldState);
  const executionResults = useRecoilValue(executionResultsState);
  const picDesc = useRecoilValue(picDescState);
  const studentInsights = useRecoilValue(studentInsightsState);
  const selectedFiles = useRecoilValue(selectedFileState);
  const selectedImage = useRecoilValue(selectedImageState);

  // 測試傳送資料
  useEffect(() => {
    console.log("autoCompleteTextField", autoCompleteTextField);
    console.log("executionResults", executionResults);
    console.log("picDesc", picDesc);
    console.log("studentInsights", studentInsights);
  }, [autoCompleteTextField, executionResults, picDesc, studentInsights]);

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
  // 透過 建立新的 record
  async function handlsSubmit() {
    let _newDatas = {
      student_id: cookies.student_id,
      student_name: decodeURIComponent(cookies.student_name),
      river_id: autoCompleteTextField[1],
      class: autoCompleteTextField[2],
      date: autoCompleteTextField[3],
      teacher_name: autoCompleteTextField[4],
      execution_results: executionResults,
      picDesc: picDesc,
      picsUrl: [],
      studentInsights: studentInsights,
      course_id: _id,
      teacher_id: teacher_id,
    };
    try {
      const images = await handleUpload();
      // console.log("images", images);
      images.files.forEach((image) => _newDatas.picsUrl.push(image.path));
      await useNodePostApi("/api/record/newCcso", _newDatas);
      setOpen(true);
      setTimeout(() => {
        router.push(
          `/students/courseRecords/workspace?id=${_id}&teacher_id=${teacher_id}`
        );
      }, [1500]);
    } catch (err) {
      console.log("err", err);
    }
  }

  // toast
  // const handleClick = () => {
  //   setOpen(true);
  // };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div
      id="container"
      className="flex flex-col w-full min-h-screen text-primary_500 bg-white justify-between items-stretch overflow-auto pt-[3.5rem]"
    >
      <div
        id="back"
        className="flex w-full min-h-[10%] justify-start items-center gap-2 px-4"
        onClick={() => {
          router.back();
        }}
      >
        <ChevronLeftIcon className="w-4 h-4" />
        <p className="text-lg">返回</p>
      </div>
      <div
        id="contents"
        className="flex flex-col flex-grow w-full text-xl justify-start items-center px-8 gap-2"
      >
        <div
          id="student_identity"
          className="flex flex-col text-base border-b-[1px] border-primary_500 w-full h-max "
        >
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p>學號：{cookies.student_id}</p>
              <p>姓名：{decodeURI(cookies.student_name)}</p>
              <p>日期：{autoCompleteTextField[3]}</p>
            </div>
            <div className="flex flex-col">
              <p>教官：{autoCompleteTextField[4]}</p>
              <p>系班級：{autoCompleteTextField[2]}</p>
              <p>地點：{autoCompleteTextField[1]}</p>
            </div>
          </div>
        </div>
        <div
          id="main_content"
          className="flex flex-col w-full h-max mt-4 gap-4"
        >
          <div id="resultDesc1" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">執行成果重點說明</p>
            <p className="flex flex-wrap max-w-full h-max text-gray-600 text-base overflow-hidden">
              {executionResults ? executionResults : "尚未填寫"}
            </p>
          </div>
          <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">上傳照片</p>
            <div className="flex flex-wrap">
              {selectedImage.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Preview ${index}`}
                  style={{ maxWidth: "95px", margin: "5px" }}
                />
              ))}
            </div>
          </div>
          <div id="resultDesc3" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">成果照片相關說明</p>
            <p className="flex flex-wrap text-gray-600 text-base h-max">
              {picDesc ? picDesc : "尚未填寫"}
            </p>
          </div>
          <div id="resultDesc4" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">學生心得</p>
            <p className="flex flex-wrap text-gray-600 text-base h-max">
              {studentInsights ? studentInsights : "尚未填寫"}
            </p>
          </div>
        </div>
      </div>
      <div
        id="footer"
        className="flex w-[100%] min-h-[15%] justify-center items-center gap-2"
      >
        <button
          className="flex w-[8rem] h-[2rem] rounded border-[1px] bg-white border-gray-500 text-lg text-primary_500 justify-center items-center"
          onClick={() => {
            router.back();
          }}
        >
          修改
        </button>
        <button
          className="flex w-[8rem] h-[2rem] rounded border-[1px] bg-white border-gray-500 text-lg text-primary_500 justify-center items-center"
          onClick={() => {
            handlsSubmit();
          }}
        >
          確認提交
        </button>
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
    </div>
  );
}

export default Page;
