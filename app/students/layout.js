"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation.js";

import { getCookies, deleteCookie } from "cookies-next";

export default function studentLayout({ children }) {
  const router = useRouter();
  const cookies = getCookies();

  useEffect(() => {
    console.log("students layout cookies", cookies);
    const _accessToken = cookies.acc_tku;
    if (!_accessToken) {
      router.push("/login");
    }
  }, [cookies]);
  return (
    <div
      id="container"
      className="relative flex flex-col w-screen lg:w-[390px] h-screen lg:h-[844px] bg-white justify-center items-center overflow-auto"
    >
      <div className="absolute top-0 right-0 flex w-[100%] h-[3rem] bg-primary_500 justify-end items-center p-2 z-10">
        <button
          className="w-[3rem] h-[2rem] bg-primary_500 border-[1px] border-primary_200 rounded"
          onClick={() => {
            deleteCookie("acc_tku");
            deleteCookie("accessToken");
            deleteCookie("student_id");
            deleteCookie("student_name");
            deleteCookie("student_class");
            deleteCookie("student_tier");
            router.push("/login");
          }}
        >
          登出
        </button>
      </div>
      {children}
    </div>
  );
}
