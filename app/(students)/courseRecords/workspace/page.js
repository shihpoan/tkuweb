"use client";
import React from "react";
import { useRouter } from "next/navigation.js";

function page() {
  const router = useRouter();
  const btnStyleAndDataArr = [
    {
      color: "bg-orange-600",
      text: "服務成果",
      url: "/courseRecords/workspace/record/ccso?title=校園與社區服務學習課程服務成果表",
    },
    {
      color: "bg-orange-500",
      text: "服務日誌",
      url: "/courseRecords/workspace/record/serviceLogs?title=服務學習服務日誌",
    },
    {
      color: "bg-orange-400",
      text: "反思紀錄",
      url: "/courseRecords/workspace/record/reflectionRecords?title=反思紀錄表",
    },
    {
      color: "bg-orange-300",
      text: "學習歷程",
      url: "/courseRecords/workspace/record/cslr?title=社區服務學習歷程反思單",
    },
    { color: "bg-blue-200", text: "課程滿意度調查", url: "/" },
    { color: "bg-blue-100", text: "系統滿意度調查", url: "/" },
  ];
  return (
    <div
      id="container"
      className="flex flex-col w-screen h-screen text-gray-800 bg-white justify-center items-center overflow-auto gap-2"
    >
      <h1 className="text-3xl font-bold mb-8">學習表單列表</h1>
      {btnStyleAndDataArr.map((button, bIdx) => (
        <button
          key={bIdx}
          className={`min-w-[10rem] w-max h-[5rem] text-[20px] font-bold ${button.color} rounded p-2`}
          onClick={() => {
            router.push(`${button.url}`);
          }}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
}

export default page;
