"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image.js";

function page({ params }) {
  const router = useRouter();
  const pathname = usePathname();

  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    console.log("params", params.courseId);
    setCourseId(`${params.courseId[0]}`);
  }, []);
  useEffect(() => {
    const isLoggedIn = true; // 你需要实现 checkLoginStatus 方法

    if (!isLoggedIn) {
      // 保存当前页面路径，以便登录后可以返回
      const returnUrl = pathname;
      router.push(`/login?redirect=${encodeURIComponent(returnUrl)}`);
      console.log("returnUrl", returnUrl);
    }
  }, [router]);

  return (
    <>
      <div className="flex flex-col w-screen h-screen bg-white overflow-auto">
        <div className="flex w-[100%] min-h-[15%] bg-white text-primary_500 text-3xl justify-center items-center">
          課程標題
        </div>
        <div className="flex flex-col w-[100%] min-h-[70%] h-max bg-gray-200">
          <Image
            priority
            width={400}
            height={400}
            src={"/images/test.png"}
            alt="test"
          />
          <div id="content" className="flex flex-col w-[100%] h-max">
            <div id="tag" className="w-[100%] h-max p-2">
              <div className="w-max h-max text-white bg-primary_500 rounded p-2">
                庄子后溪
              </div>
              <div className="w-[100%] h-max text-lg text-black px-4 py-2">
                <p>
                  庄子內溪，為淡水河支流之一，以前英專路一帶稱為庄仔內，溪流經過庄仔內故名。在庄仔內溪河口、外鼻仔頭的西側，淡水捷運站、殼牌倉庫、水上人家旁，又稱「港仔溝」、「港仔溝海」，因庄子內溪下游段溪水流入淡水港形成的港灣而得名。而庄仔內溪也流經淡水學府里與鄧公里，是貫穿這兩個里的重要溪流，其沿線還有已廢棄的雙峻頭南一圳、早期軍方設施，同時因為廢棄使用，使得生態相當豐富。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[100%] min-h-[15%] bg-white justify-center items-center gap-2">
          <div className="flex flex-col w-[10rem] h-[5rem] bg-primary_500 text-xl rounded justify-center items-center px-2 py-4">
            <p>進入360度</p>
            <p>環景模式</p>
          </div>
          <div
            className="flex flex-col w-[10rem] h-[5rem] text-xl bg-primary_500 rounded justify-center items-center px-2 py-4"
            onClick={() => {
              router.push(`/courseRecords/home?courseId=${courseId}`);
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
