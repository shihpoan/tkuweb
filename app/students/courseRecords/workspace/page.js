"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";

import { getCookie } from "cookies-next";

function page() {
  const router = useRouter();
  const _student_tier = getCookie("student_tier");

  const [btnStyledAndDataArr, setBtnStyledAndDataArr] = useState([
    {
      color: "bg-primary_500",
      text: "學習歷程反思單(個人)",
      url: "/students/courseRecords/workspace/record/cslr?title=學習歷程反思單",
      tier: ["members", "leader"],
    },
    {
      color: "bg-primary_500",
      text: "服務日誌(個人)",
      url: "/students//courseRecords/workspace/record/serviceLogs?title=服務日誌",
      tier: ["members", "leader"],
    },
    {
      color: "bg-primary_500",
      text: "反思討論紀錄表(小組)",
      url: "/students//courseRecords/workspace/record/reflectionRecords?title=反思討論紀錄表",
      tier: ["leader"],
    },
    {
      color: "bg-primary_500",
      text: "服務成果表(小組)",
      url: "/students//courseRecords/workspace/record/ccso?title=服務成果表",
      tier: ["leader"],
    },
    {
      color: "bg-primary_200",
      text: "課程滿意度調查",
      url: "/",
      tier: ["leader"],
    },
    {
      color: "bg-primary_200",
      text: "系統滿意度調查",
      url: "/",
      tier: ["leader"],
    },
  ]);

  useEffect(() => {
    const _datas = [...btnStyledAndDataArr];

    if (_datas.length) {
      const dataTierFilter = _datas.filter((data) =>
        data.tier.find((i) => i == _student_tier)
      );
      console.log("dataTierFilter", dataTierFilter);
      setBtnStyledAndDataArr([...dataTierFilter]);
    }
  }, []);

  return (
    <div
      id="container"
      className="flex flex-col h-[80%] text-primary_500 bg-white justify-start items-center overflow-auto gap-2 px-4"
    >
      <h1 className="text-3xl font-bold mb-8">學習表單列表</h1>
      {btnStyledAndDataArr.map((button, bIdx) => (
        <button
          key={bIdx}
          className={`min-w-[15rem] h-[5rem] text-[20px] text-white font-bold ${button.color} rounded p-2`}
          onClick={() => {
            router.push(`${button.url}`);
          }}
        >
          {button.text}
        </button>
      ))}
      <p className="text-lg text-red-500 mt-8">您的登入身份為：組員。</p>
      <p className="text-lg text-red-500 mt-2">若您是組長請向課程老師反應。</p>
    </div>
  );
}

export default page;
