"use client";
import React from "react";
import { useRouter } from "next/navigation.js";

function page() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-[5rem]">
      <div className="text-4xl text-black font-bold">
        <p>河川生態保育教學</p>
      </div>
      <div className="flex flex-col items-center gap-8">
        <button
          className="w-[10rem] text-2xl text-gray-800 border-[2px] border-black bg-white rounded p-2"
          onClick={() => {
            router.push("/dashboard/rivers");
          }}
        >
          教學課程
        </button>
        <button
          className="w-[10rem] text-2xl text-gray-800 border-[2px] border-black bg-white rounded p-2"
          onClick={() => {
            router.push("/dashboard/reports");
          }}
        >
          學習紀錄
        </button>
      </div>
    </div>
  );
}

export default page;
