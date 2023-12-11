"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation.js";

export default function recordLayout({ children }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const _param = searchParams.get("title");

  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log("path", pathname, _param);
    setTitle(`${_param}`);
  }, [pathname]);
  return (
    <div
      id="container"
      className="flex flex-col w-screen lg:w-[390px] min-h-screen justify-between items-stretch overflow-auto pt-10"
    >
      <div
        id="title"
        className="flex flex-col w-[100%] h-max justify-center items-center gap-2"
      >
        <p className="text-4xl">112學年淡江大學</p>
        <p>{title}</p>
      </div>
      {children}
    </div>
  );
}
