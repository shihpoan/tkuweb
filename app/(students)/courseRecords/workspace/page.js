"use client";
import React from "react";
import { useRouter } from "next/navigation.js";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  executionResultsState,
  picDescState,
  studentInsightsState,
} from "@/atoms/workspaceDataAtoms.js";

function page() {
  const router = useRouter();

  const [executionResults, setExecutionResults] = useRecoilState(
    executionResultsState
  );
  const [picDesc, setPicDesc] = useRecoilState(picDescState);
  const [studentInsights, setStudentInsightsState] =
    useRecoilState(studentInsightsState);

  return (
    <div
      id="container"
      className="flex flex-col w-screen min-h-screen justify-between items-stretch overflow-auto"
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
        <div id="resultDesc1" className="flex flex-col w-full h-max gap-2">
          <p>執行成果重點說明</p>
          <TextareaAutosize
            minRows={3}
            style={{
              width: "100%",
              border: "1px solid #125C66",
              borderRadius: "5px",
              color: "black",
              padding: "4px",
            }}
            placeholder="請輸入内容..."
            value={executionResults}
            onChange={(e) => {
              setExecutionResults(e.target.value);
            }}
          />
        </div>
        <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
          <p>上傳照片</p>
          <button
            className="flex w-full h-[2rem] rounded bg-white  text-primary_500 justify-center items-center"
            onClick={() => {
              router.push("/courseRecords/workspace");
            }}
          >
            成果照片上傳
          </button>
        </div>
        <div id="resultDesc3" className="flex flex-col w-full h-max gap-2">
          <p>成果照片相關說明</p>
          <TextareaAutosize
            minRows={3}
            style={{
              width: "100%",
              border: "1px solid #125C66",
              borderRadius: "5px",
              color: "black",
              padding: "4px",
            }}
            placeholder="請輸入内容..."
            value={picDesc}
            onChange={(e) => {
              setPicDesc(e.target.value);
            }}
          />
        </div>
        <div id="resultDesc4" className="flex flex-col w-full h-max gap-2">
          <p>學生心得</p>
          <TextareaAutosize
            minRows={3}
            style={{
              width: "100%",
              border: "1px solid #125C66",
              borderRadius: "5px",
              color: "black",
              padding: "4px",
            }}
            placeholder="請輸入内容..."
            value={studentInsights}
            onChange={(e) => {
              setStudentInsightsState(e.target.value);
            }}
          />
        </div>
      </div>
      <div
        id="footer"
        className="flex flex-col w-[100%] min-h-[15%] justify-center items-center gap-2"
      >
        <button
          className="flex w-[8rem] h-[2rem] rounded border-[1px] bg-white border-gray-500 text-lg text-primary_500 justify-center items-center"
          onClick={() => {
            router.push(`/courseRecords/workspace/preview/a`);
          }}
        >
          提交
        </button>
      </div>
    </div>
  );
}

export default page;
