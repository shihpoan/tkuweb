"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { getCookie } from "cookies-next";

import { useNodePostApi } from "@/hooks/useNodeApi.js";

function page() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const _id = searchParams.get("id");

  const _student_tier = getCookie("student_tier");
  const _student_id = getCookie("student_id");

  const [btnStyledAndDataArr, setBtnStyledAndDataArr] = useState([
    {
      color: "bg-primary_500",
      text: "學習歷程反思單(個人)",
      code: "cslr",
      url: `/students/courseRecords/workspace/record/cslr?title=學習歷程反思單&id=${_id}`,
      tier: ["members", "leader"],
      isShown: true,
    },
    {
      color: "bg-primary_500",
      text: "服務日誌(個人)",
      code: "serviceLogs",
      url: `/students/courseRecords/workspace/record/serviceLogs?title=服務日誌&id=${_id}`,
      tier: ["members", "leader"],
      isShown: true,
    },
    {
      color: "bg-primary_500",
      text: "反思討論紀錄表(小組)",
      code: "reflectionRecords",
      url: `/students/courseRecords/workspace/record/reflectionRecords?title=反思討論紀錄表&id=${_id}`,
      tier: ["leader"],
      isShown: true,
    },
    {
      color: "bg-primary_500",
      text: "服務成果表(小組)",
      code: "ccso",
      url: `/students/courseRecords/workspace/record/ccso?title=服務成果表&id=${_id}`,
      tier: ["leader"],
      isShown: true,
    },
    {
      color: "bg-primary_500",
      text: "課程滿意度調查",
      code: "course",
      url: `/students/feedbackForms/courseFeedback?title=課程滿意度調查&id=${_id}`,
      tier: ["members", "leader"],
      isShown: true,
    },
    {
      color: "bg-primary_500",
      text: "系統滿意度調查",
      code: "system",
      url: `/students/feedbackForms/systemFeedback?title=系統滿意度調查&id=${_id}`,
      tier: ["members", "leader"],
      isShown: true,
    },
  ]);
  const [isCcsoExistedState, setIsCcsoExistedState] = useState(true);
  const [isCslrExistedState, setIsCslrExistedState] = useState(true);
  const [isSlExistedState, setIsSlExistedState] = useState(true);
  const [isRrExistedState, setIsRrExistedState] = useState(true);
  const [isCourseFeedbacksExistedState, setIsCourseFeedbacksExistedState] =
    useState(true);
  const [isSystemFeedbacksExistedState, setIsSystemFeedbacksExistedState] =
    useState(true);

  useEffect(() => {
    async function findDbData(route1, route2) {
      const dbDatas = await useNodePostApi(`/api/${route1}/find${route2}`);

      const data = dbDatas.data.data;
      console.log("data", data);

      const indexOfData = data.findIndex(
        (i) => i.student_id == _student_id && i.course_id == _id
      );
      console.log("indexOfData", indexOfData);
      if (indexOfData + 1 > 0) {
        switch (route2) {
          case "Cslr":
            setIsCslrExistedState(false);
            break;
          case "Sl":
            setIsSlExistedState(false);
            break;
          case "Rr":
            setIsRrExistedState(false);
            break;
          case "Ccso":
            setIsCcsoExistedState(false);
            break;
          case "CourseFeedbacks":
            setIsCourseFeedbacksExistedState(false);
            break;
          case "SystemFeedbacks":
            setIsSystemFeedbacksExistedState(false);
            break;
        }
      }
    }
    const asyncFunctions = [
      findDbData("record", "Cslr"),
      findDbData("record", "Sl"),
      findDbData("record", "Rr"),
      findDbData("record", "Ccso"),
      findDbData("courseFeedback", "CourseFeedbacks"),
      findDbData("systemFeedback", "SystemFeedbacks"),
    ];

    Promise.all(asyncFunctions)
      .then((results) => console.log("re", results))
      .catch((err) => console.log("err", err));
  }, []);

  // 處理預設顯示
  useEffect(() => {
    const _btnStyledAndDataArr = [...btnStyledAndDataArr];
    _btnStyledAndDataArr.forEach((btn) => {
      let code = btn.code;

      switch (code) {
        case "cslr":
          btn.isShown = isCslrExistedState;
          break;
        case "serviceLogs":
          btn.isShown = isSlExistedState;
          break;
        case "reflectionRecords":
          btn.isShown = isRrExistedState;
          break;
        case "ccso":
          btn.isShown = isCcsoExistedState;
          break;
        case "course":
          btn.isShown = isCourseFeedbacksExistedState;
          break;
        case "system":
          btn.isShown = isSystemFeedbacksExistedState;
          break;
        default:
          console.log("數字不在1到3之間");
      }
    });
    console.log("_btnStyledAndDataArr", _btnStyledAndDataArr);
    if (_btnStyledAndDataArr.length) {
      const dataTierFilter = _btnStyledAndDataArr.filter((data) =>
        data.tier.find((i) => i == _student_tier)
      );
      // console.log("dataTierFilter", dataTierFilter);
      setBtnStyledAndDataArr([...dataTierFilter]);
    }
  }, [
    isCslrExistedState,
    isSlExistedState,
    isRrExistedState,
    isCcsoExistedState,
    isCourseFeedbacksExistedState,
    isSystemFeedbacksExistedState,
  ]);

  return (
    <div
      id="container"
      className="flex flex-col h-[80%] text-primary_500 bg-white justify-start items-center overflow-auto gap-2 px-4"
    >
      <h1 className="text-3xl font-bold mb-8">學習表單列表</h1>
      {btnStyledAndDataArr.map((button, bIdx) => (
        <button
          key={bIdx}
          className={`min-w-[15rem] h-[5rem] text-[20px] text-white font-bold ${
            button.isShown ? button.color : "bg-primary_200"
          } rounded p-2`}
          onClick={() => {
            button.isShown ? router.push(`${button.url}`) : alert("已填寫完成");
          }}
        >
          {button.text}
        </button>
      ))}
      {_student_tier == "members" && (
        <>
          <p className="text-lg text-red-500 mt-8">您的登入身份為：組員。</p>
          <p className="text-lg text-red-500 mt-2">
            若您是組長請向課程老師反應。
          </p>
        </>
      )}
    </div>
  );
}

export default page;
