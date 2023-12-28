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
  cslrAutoCompleteTextFieldState,
  q1State,
  q2State,
  q3State,
  q4State,
  q5State,
  q6State,
} from "@/atoms/cslrTempDatasAtoms.js";

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

  const autoCompleteTextField = useRecoilValue(cslrAutoCompleteTextFieldState);
  const q1 = useRecoilValue(q1State);
  const q2 = useRecoilValue(q2State);
  const q3 = useRecoilValue(q3State);
  const q4 = useRecoilValue(q4State);
  const q5 = useRecoilValue(q5State);
  const q6 = useRecoilValue(q6State);

  // 透過 建立新的 record
  async function handlsSubmit() {
    const _newDatas = {
      student_id: cookies.student_id,
      student_name: decodeURIComponent(cookies.student_name),
      river_id: autoCompleteTextField[1],
      class: autoCompleteTextField[2],
      date: autoCompleteTextField[3],
      academicYear: autoCompleteTextField[4],
      semester: autoCompleteTextField[5],
      q1: q1,
      q2: q2,
      q3: q3,
      q4: q4,
      q5: q5,
      q6: q6,
      course_id: _id,
      teacher_id: teacher_id,
    };
    try {
      await useNodePostApi("/api/record/newCslr", _newDatas);
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
              <p>學號：{cookies.student_id}</p>
              <p>姓名：{decodeURI(cookies.student_name)}</p>
              <p>系班級：{autoCompleteTextField[2]}</p>
              <p>日期：{autoCompleteTextField[3]}</p>
            </div>
            <div className="flex flex-col">
              <p>學年：{autoCompleteTextField[4]}</p>
              <p>學期：{autoCompleteTextField[5]}</p>
            </div>
          </div>
        </div>
        <div
          id="main_content"
          className="flex flex-col w-full h-max mt-4 gap-4"
        >
          <div id="resultDesc1" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">
              在本次社區服務中，你印象最深刻的畫面是什麼？為什麼？
            </p>
            <p className="flex flex-wrap max-w-full h-max text-gray-600 text-base overflow-hidden">
              {q1 ? q1 : "尚未填寫資料"}
            </p>
          </div>
          <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">
              對你而言，這次的社區服務有什麼意義？在本次社區服務後，你願不願意參與更多的志工服務？
            </p>
            <p className="flex flex-wrap text-gray-600 text-base h-max">
              {q2 ? q2 : "尚未填寫資料"}
            </p>
          </div>
          <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">
              請用一句話來形容本學期參與社區服務的感覺，為什麼是這句話？
            </p>
            <p className="flex flex-wrap text-gray-600 text-base h-max">
              {q3 ? q3 : "尚未填寫資料"}
            </p>
          </div>
          <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">
              在本次社區服務裡，你覺得感到最具挑戰性的地方是什麼？為什麼？
            </p>
            <p className="flex flex-wrap text-gray-600 text-base h-max">
              {q4 ? q4 : "尚未填寫資料"}
            </p>
          </div>
          <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">
              在這個社區服務中，你對自己有什麼新的認識？
            </p>
            <p className="flex flex-wrap text-gray-600 text-base h-max">
              {q5 ? q5 : "尚未填寫資料"}
            </p>
          </div>
          <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
            <p className="text-black font-bold">
              在這次社區服務中，你覺得我們有沒有什麼可以更努力的地方？
            </p>
            <p className="flex flex-wrap text-gray-600 text-base h-max">
              {q6 ? q6 : "尚未填寫資料"}
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
