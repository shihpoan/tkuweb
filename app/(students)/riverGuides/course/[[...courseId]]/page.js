"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image.js";
import Link from "next/link";

import { getCookies } from "cookies-next";

import { useNodePostApi } from "@/hooks/useNodeApi.js";

function page({ params }) {
  const router = useRouter();
  const pathname = usePathname();

  const [courseId, setCourseId] = useState("");
  const [river, setRiver] = useState({});

  const cookies = getCookies();

  useEffect(() => {
    console.log("params", params.courseId);
    console.log("cookies", decodeURIComponent(cookies.student_name));
    setCourseId(`${params.courseId[0]}`);
  }, []);
  useEffect(() => {
    const isLoggedIn = cookies.student_id && cookies.student_name; // 你需要实现 checkLoginStatus 方法

    if (!isLoggedIn) {
      // 保存当前页面路径，以便登录后可以返回
      const returnUrl = pathname;
      router.push(`/login?redirect=${encodeURIComponent(returnUrl)}`);
      console.log("returnUrl", returnUrl);
    }
  }, [router]);

  useEffect(() => {
    async function findRiver() {
      try {
        const dbRivers = await useNodePostApi("/api/river/findRiverById", {
          id: courseId,
        });
        const river = dbRivers.data.data;
        console.log(river);
        setRiver({ ...river });
        if (dbRivers.statusText != "OK") {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        console.log("err", err);
      }
    }
    findRiver();
  }, [courseId]);

  return (
    <>
      <div className="flex flex-col w-screen lg:w-[390px] h-screen lg:h-[844px] bg-white justify-between items-stretch overflow-auto">
        <div className="flex w-[100%] min-h-[15%] bg-white text-primary_500 text-3xl justify-center items-center">
          {river.name}
        </div>
        <div className="flex flex-col w-[100%] h-max bg-gray-200">
          <div className="w-full h-[15rem] bg-blue-100">
            <Image
              priority
              width={244}
              height={149}
              src={"/images/庄子後溪.jpg"}
              alt="庄子後溪"
              className="w-full h-full"
            />
          </div>

          <div id="contents" className="flex flex-col flex-grow w-[100%]">
            <div id="tag" className="w-[100%] h-max p-2">
              <div className="flex w-max h-max text-white bg-primary_500 rounded p-2">
                {river.name}
              </div>
            </div>
            <div className="flex w-[100%] h-max text-lg text-black px-4 py-2">
              <p>{river.desc}</p>
            </div>
          </div>
        </div>
        <div className="flex w-[100%] min-h-[15%] bg-white justify-center items-center gap-2">
          <Link
            href="https://vr360.com.tw/d?sid=2RnNa2HC"
            className="flex flex-col w-[10rem] h-[5rem] bg-primary_500 text-xl rounded justify-center items-center px-2 py-4"
          >
            <p>進入360度</p>
            <p>環景模式</p>
          </Link>
          <div
            className="flex flex-col w-[10rem] h-[5rem] text-xl bg-primary_500 rounded justify-center items-center px-2 py-4"
            onClick={() => {
              router.push(`/courseRecords/workspace`);
            }}
          >
            <p>填寫學習</p>
            <p>成果紀錄</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
