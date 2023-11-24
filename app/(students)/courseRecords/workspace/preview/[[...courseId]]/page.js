"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation.js";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
// import { useToast } from "@chakra-ui/react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Image from "next/image.js";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  executionResultsState,
  picDescState,
  studentInsightsState,
} from "@/atoms/workspaceDataAtoms.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function page() {
  const router = useRouter();
  //   const toast = useToast();

  const [open, setOpen] = useState(false);

  const executionResults = useRecoilValue(executionResultsState);
  const picDesc = useRecoilValue(picDescState);
  const studentInsights = useRecoilValue(studentInsightsState);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div
      id="container"
      className="flex flex-col w-screen min-h-screen text-primary_500 bg-white justify-between items-stretch overflow-auto"
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
          className="flex flex-col border-b-[1px] border-primary_500 w-full h-max "
        >
          <div className="flex justify-between">
            <p>10900207</p>
            <p>施柏安</p>
            <p>2023/11/23</p>
          </div>
          <div className="flex text-lg justify-between">
            <p>陳ＯＯ教官</p>
            <p>經濟一Ａ</p>
            <p>地點：庄子后溪</p>
          </div>
        </div>
        <div
          id="main_content"
          className="flex flex-col w-full h-max mt-4 gap-4"
        >
          <div id="resultDesc1" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">執行成果重點說明</p>
            <p className="flex flex-wrap text-gray-600 text-base h-max">
              {executionResults
                ? executionResults
                : "貫穿這兩個里的重要溪流，其沿線還有已廢棄的雙峻頭南一圳、早期軍方設施，同時因為廢棄使用，使得生態相當豐富。"}
            </p>
          </div>
          <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">上傳照片</p>
            <div className="flex flex-wrap max-w-full gap-2">
              {[1, 2, 3, 4, 5].map((i, idx) => (
                <Image
                  key={idx}
                  alt="pic"
                  src={"/images/test.png"}
                  width={400}
                  height={300}
                  className="w-[80px] h-[60px]"
                />
              ))}
            </div>
          </div>
          <div id="resultDesc3" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">成果照片相關說明</p>
            <p className="flex flex-wrap text-gray-600 text-base h-max">
              {picDesc
                ? picDesc
                : "這組照片捕捉了穿越兩個村落重要溪流旁的景象，其中包括已廢棄的雙峻頭南一圳，這是一處曾經滋養土地的古老水利設施。照片中還展示了早期的軍事設施遺址，它們的廢棄不僅訴說著過往的故事，也為當地生態提供了一片豐饒的庇護所。"}
            </p>
          </div>
          <div id="resultDesc4" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">學生心得</p>
            <p className="flex flex-wrap text-gray-600 text-base h-max">
              {studentInsights
                ? studentInsights
                : "古水渠旁，遺跡與豐富生態共生，歷史與自然交織。"}
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
            handleClick();
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

export default page;
