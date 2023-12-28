"use client";
import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Policy from "@/components/Policy.js";

function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const _id = searchParams.get("id");
  const teacher_id = searchParams.get("teacher_id");

  return (
    <div className="flex flex-col bg-primary_500 pb-4 items-center">
      <Policy />
      <button
        className="flex w-max h-[3rem] font-bold bg-primary_500 border-[1px] border-white rounded px-2 justify-center items-center"
        onClick={() => {
          router.push(
            `/students/courseRecords/workspace?id=${_id}&teacher_id=${teacher_id}`
          );
        }}
      >
        我同意個資蒐集
      </button>
    </div>
  );
}

export default page;
