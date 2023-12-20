"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation.js";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
// import { useToast } from "@chakra-ui/react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Image from "next/image.js";
import { getCookies } from "cookies-next";

import { useRecoilState, useRecoilValue } from "recoil";

import {
  rrAutoCompleteTextFieldState,
  participantsState,
  discussionTopicAndContentState,
} from "@/atoms/rrTempDatasAtoms.js";
import { useNodeGetApi, useNodePostApi } from "@/hooks/useNodeApi.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function page() {
  const router = useRouter();
  const cookies = getCookies();

  const [open, setOpen] = useState(false);

  const autoCompleteTextField = useRecoilValue(rrAutoCompleteTextFieldState);
  const participants = useRecoilValue(participantsState);
  const discussionTopicAndContent = useRecoilValue(
    discussionTopicAndContentState
  );

  // 透過 建立新的 record
  async function handlsSubmit() {
    const _newDatas = {
      student_id: cookies.student_id,
      student_name: decodeURIComponent(cookies.student_name),
      river_id: autoCompleteTextField[1],
      class: autoCompleteTextField[2],
      date: autoCompleteTextField[3],
      host: autoCompleteTextField[4],
      recorder: autoCompleteTextField[5],
      participants: participants,
      discussionTopicAndContent: discussionTopicAndContent,
    };
    try {
      await useNodePostApi("/api/record/newRr", _newDatas);
      setOpen(true);
      setTimeout(() => {
        router.push("/students/courseRecords/workspace");
      }, [1500]);
    } catch (err) {
      console.log("err", err);
    }
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div
      id="container"
      className="flex flex-col w-screen min-h-screen text-primary_500 bg-white justify-between items-stretch overflow-auto pt-[3.5rem]"
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
              <p>學號：10900207</p>
              <p>姓名：施柏安</p>
              <p>系班級：{autoCompleteTextField[2]}</p>
              <p>日期：{autoCompleteTextField[3]}</p>
            </div>
            <div className="flex flex-col">
              <p>主持人：{autoCompleteTextField[4]}</p>
              <p>紀錄：{autoCompleteTextField[5]}</p>
              <p>地點：{autoCompleteTextField[1]}</p>
            </div>
          </div>
        </div>
        <div
          id="main_content"
          className="flex flex-col w-full h-max mt-4 gap-4"
        >
          <div id="resultDesc1" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">參與人員</p>
            <p className="flex flex-wrap max-w-full h-max text-gray-600 text-base overflow-hidden">
              {participants ? participants : "participants participants"}
            </p>
          </div>
          <div id="resultDesc3" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">討論主題與內容</p>
            <p className="flex flex-wrap text-gray-600 text-base h-max">
              {discussionTopicAndContent
                ? discussionTopicAndContent
                : "discussionTopicAndContent discussionTopicAndContent"}
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

export default page;
