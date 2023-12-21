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
      className="relative flex flex-col w-full lg:w-[390px] bg-primary_500 justify-between items-stretch overflow-auto pt-[4.5rem]"
    >
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
