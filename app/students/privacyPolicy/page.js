"use client";
import React from "react";
import { useRouter } from "next/navigation.js";
import Policy from "@/components/Policy.js";

function page() {
  const router = useRouter();
  return (
    <div className="flex flex-col bg-primary_500 pb-4 items-center">
      <Policy />
      <button
        className="flex w-max h-[3rem] font-bold bg-primary_500 border-[1px] border-white rounded px-2 justify-center items-center"
        onClick={() => {
          router.push(`/students/courseRecords/workspace`);
        }}
      >
        我同意個資蒐集
      </button>
    </div>
  );
}

export default page;
