"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation.js";

export default function recordLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const _param = searchParams.get("title");

  const [title, setTitle] = useState("");
  const [doNotRefreshWhenEdit, setDoNotRefreshWhenEdit] = useState(true);

  useEffect(() => {
    console.log("path", pathname, _param);
    setTitle(`${_param}`);
  }, [pathname]);
  return (
    <div
      id="container"
      className="relative flex flex-col w-full lg:w-[390px] bg-primary_500 justify-between items-stretch overflow-auto pt-[3.5rem]"
    >
      <div
        className={`absolute top-[30%] left-1/2 flex flex-col w-max h-max bg-red-500 text-xl rounded opacity-90 z-20 transform -translate-x-1/2 justify-center items-center gap-4 p-4 ${
          doNotRefreshWhenEdit ? "block" : "hidden"
        }`}
      >
        <p>填寫資料時請勿重新整理</p>
        <p>否則將遺失填寫後的資料</p>
        <div
          className="flex w-[5rem] border-[1px] border-white rounded p-1 justify-center"
          onClick={() => {
            setDoNotRefreshWhenEdit(false);
          }}
        >
          確認
        </div>
      </div>
      <div
        id="title"
        className="flex flex-col w-[100%] h-max justify-center items-center gap-2"
      >
        <p className="text-3xl">112學年淡江大學河川保育</p>
        <p className="text-2xl">{title}</p>
      </div>
      {children}
    </div>
  );
}
