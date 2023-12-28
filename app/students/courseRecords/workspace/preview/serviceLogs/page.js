"use client";
import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
// import { useToast } from "@chakra-ui/react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Image from "next/image.js";
import { getCookies } from "cookies-next";

import { useRecoilState, useRecoilValue } from "recoil";

import {
  slAutoCompleteTextFieldState,
  dataPresentationMethodState,
  serviceContentAndLearningPointsState,
  serviceReflectionState,
  moodJournalState,
} from "@/atoms/slTempDatasAtoms.js";
import { useNodeGetApi, useNodePostApi } from "@/hooks/useNodeApi.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const _id = searchParams.get("id");
  const teacher_id = searchParams.get("teacher_id");

  const cookies = getCookies();

  const [open, setOpen] = useState(false);

  const autoCompleteTextField = useRecoilValue(slAutoCompleteTextFieldState);
  const dataPresentationMethod = useRecoilValue(dataPresentationMethodState);
  const serviceContentAndLearningPoints = useRecoilValue(
    serviceContentAndLearningPointsState
  );
  const serviceReflection = useRecoilValue(serviceReflectionState);
  const moodJournal = useRecoilValue(moodJournalState);

  // 透過 建立新的 record
  async function handlsSubmit() {
    const _newDatas = {
      student_id: cookies.student_id,
      student_name: decodeURIComponent(cookies.student_name),
      river_id: autoCompleteTextField[1],
      class: autoCompleteTextField[2],
      date: autoCompleteTextField[3],
      service_hours: autoCompleteTextField[4],
      service_number: autoCompleteTextField[5],
      service_org: autoCompleteTextField[6],
      dataPresentationMethod: dataPresentationMethod,
      serviceContentAndLearningPoints: serviceContentAndLearningPoints,
      serviceReflection: serviceReflection,
      moodJournal: moodJournal,
      course_id: _id,
      teacher_id: teacher_id,
    };
    try {
      await useNodePostApi("/api/record/newSl", _newDatas);
      setOpen(true);
      setTimeout(() => {
        router.push(`/students/courseRecords/workspace?id=${_id}`);
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
      className="flex flex-col w-screen min-h-screen text-primary_500 bg-white justify-between items-stretch overflow-auto pt-[3rem]"
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
              <p>課程名稱：{autoCompleteTextField[0]}</p>
              <p>學號：{cookies.student_id}</p>
              <p>姓名：{decodeURI(cookies.student_name)}</p>
              <p>日期：{autoCompleteTextField[3]}</p>
              <p>服務機構：{autoCompleteTextField[6]}</p>
            </div>
            <div className="flex flex-col">
              <p>系班級：{autoCompleteTextField[2]}</p>
              <p>地點：{autoCompleteTextField[1]}</p>
              <p>服務時數：{autoCompleteTextField[4]}</p>
              <p>服務人數：{autoCompleteTextField[5]}</p>
            </div>
          </div>
        </div>
        <div
          id="main_content"
          className="flex flex-col w-full h-max mt-4 gap-4"
        >
          <div id="resultDesc1" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">資料呈現方式</p>
            <p className="flex flex-wrap max-w-full h-max text-gray-600 text-base overflow-hidden">
              {dataPresentationMethod
                ? dataPresentationMethod
                : "dataPresentationMethod dataPresentationMethod"}
            </p>
          </div>
          <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">服務內容與學習要點</p>
            <p className="flex flex-wrap text-gray-600 text-base h-max">
              {serviceContentAndLearningPoints
                ? serviceContentAndLearningPoints
                : "serviceContentAndLearningPoints serviceContentAndLearningPoints"}
            </p>
          </div>
          <div id="resultDesc3" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">服務反思</p>
            <p className="flex flex-wrap text-gray-600 text-base h-max">
              {serviceReflection
                ? serviceReflection
                : "serviceReflection serviceReflection"}
            </p>
          </div>
          <div id="resultDesc4" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">心情隨寫</p>
            <p className="flex flex-wrap text-gray-600 text-base h-max">
              {moodJournal ? moodJournal : "moodJournal moodJournal"}
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
