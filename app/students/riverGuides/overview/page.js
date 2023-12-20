"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import Image from "next/image.js";

import { useRecoilState } from "recoil";
import { nowSelectedCourseState } from "@/atoms/nowCourseAtom.js";
import { setCookie } from "cookies-next";

import { useNodePostApi } from "@/hooks/useNodeApi.js";

export default function Page() {
  const router = useRouter();

  const [riverList, setRiverList] = useState([]);

  const [nowSelectedCourse, setNowSelectedCourse] = useRecoilState(
    nowSelectedCourseState
  );

  useEffect(() => {
    async function findRivers() {
      try {
        const dbRivers = await useNodePostApi("/api/river/findRivers");
        const rivers = dbRivers.data.data;
        setRiverList([...rivers]);
        console.log(dbRivers);
        if (dbRivers.status != 200) {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        console.log("err", err);
      }
    }
    findRivers();
  }, []);

  useEffect(() => {
    setCookie("selected_course", nowSelectedCourse);
  }, [nowSelectedCourse]);

  return (
    <main className="flex flex-col h-[80%] justify-between items-center">
      <div className="flex flex-col text-4xl text-primary_500 font-bold gap-8">
        <p>河川生態保育場所</p>
        <div className="flex flex-col justify-center items-center gap-4">
          {[...riverList].map((river, rIdx) => (
            <div
              key={rIdx}
              className="flex flex-col border-[2px] border-primary_500  rounded gap-2 p-2 items-center"
              onClick={() => {
                setNowSelectedCourse(river.name);
                router.push(
                  `/students/riverGuides/course/${river._id.toString()}`
                );
              }}
            >
              <Image
                alt="river"
                src={`/images/${river.pic_url}`}
                width={244}
                height={149}
                className=" rounded"
              />
              <div className="flex w-[244px] text-2xl border-t-[2px] border-primary_500 bg-white p-2 justify-center">
                {river.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
