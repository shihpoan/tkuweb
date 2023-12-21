"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation.js";

export default function recordLayout({ children }) {
  return (
    <div
      id="container"
      className="relative flex flex-col w-full lg:w-[390px] bg-primary_500 justify-between items-stretch overflow-auto pt-[4.5rem]"
    >
      <div
        id="title"
        className="flex flex-col w-[100%] h-max justify-center items-center px-2 gap-2"
      >
        <h1 className="text-3xl font-semibold">112學年淡江大學</h1>
        <h1 className="text-2xl font-semibold">學生事務處、個人資料蒐集</h1>
        <h1 className="text-2xl font-semibold">處理及利用告知事項</h1>
      </div>
      {children}
    </div>
  );
}
