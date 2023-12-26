"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation.js";
import Image from "next/image.js";

import { useRecoilState } from "recoil";
import { nowSelectedCourseState } from "@/atoms/nowCourseAtom.js";
import { setCookie } from "cookies-next";

import { useNodePostApi, useNodePostImageApi } from "@/hooks/useNodeApi.js";

export default function Page() {
  const router = useRouter();

  const [riverList, setRiverList] = useState([]);
  const [riverIdArr, setRiverIdArr] = useState([]);
  const [riverImages, setRiverImages] = useState([]);

  const [nowSelectedCourse, setNowSelectedCourse] = useRecoilState(
    nowSelectedCourseState
  );

  useEffect(() => {
    async function findRivers() {
      try {
        const dbRivers = await useNodePostApi("/api/river/findRivers");
        const rivers = dbRivers.data.data;
        setRiverList([...rivers]);

        const _riverId = rivers.map((r) => r._id);
        setRiverIdArr([..._riverId]);
        // console.log(dbRivers);
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
    async function findRiversImagesByIds(ids) {
      const riverImages = [];
      let _returnImages = [];

      // 使用 Promise.all 遍歷所有 ID，並呼叫 findRiversImage 函數
      await Promise.all(
        ids.map(async (id) => {
          try {
            const dbRivers = await useNodePostImageApi(
              "/api/river/findRiverImageById",
              {
                id: id,
              }
            );

            if (dbRivers.status !== 200) {
              throw new Error("Failed to fetch data for ID: " + id);
            }

            const imageUrl = URL.createObjectURL(new Blob([dbRivers.data]));
            const index = riverIdArr.findIndex((r) => r == id);
            riverImages.push({ index: index, image: imageUrl });
            riverImages.sort((a, b) => a.index - b.index);
            // console.log("id", id, index, riverImages);
            _returnImages = riverImages.map((r) => r.image);
          } catch (err) {
            console.log("Error fetching data for ID: " + id, err);
          }
        })
      );

      return _returnImages;
    }
    // 在你的組件中使用這個函數
    async function fetchDataForMultipleIds() {
      const idsToFetch = [...riverIdArr]; // 替換為你的 ID 列表

      // console.log("idsToFetch", idsToFetch);
      try {
        const images = await findRiversImagesByIds(idsToFetch);
        // console.log("images", images);

        setRiverImages(images);
      } catch (error) {
        console.error("Error fetching data for multiple IDs:", error);
      }
    }
    fetchDataForMultipleIds();
  }, [riverIdArr]);

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
              <img
                alt="river"
                src={riverImages[rIdx]}
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
