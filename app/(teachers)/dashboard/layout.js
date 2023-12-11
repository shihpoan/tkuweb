"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation.js";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function dashboardLayout({ children }) {
  const router = useRouter();
  return (
    <div
      id="container"
      className="relative flex flex-col w-screen h-screen overflow-auto"
    >
      <div
        id="back"
        className="lg:absolute lg:top-4 lg:left-4 flex lg:w-max w-full h-[5%] lg:h-max justify-start items-center px-2"
        onClick={() => {
          router.back();
        }}
      >
        <ChevronLeftIcon className="w-4 h-4" />
        <p className="text-lg">返回</p>
      </div>
      {children}
    </div>
  );
}
