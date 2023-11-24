"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import Link from "next/link";

function TestHome() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [studentNumberFocus, setStudentNumberFocus] = useState(false);
  const [studentNumberValue, setStudentNumberValue] = useState("");
  const [studentNameFocus, setStudentNameFocus] = useState(false);
  const [studentNameValue, setStudentNameValue] = useState("");
  const [studentClassFocus, setStudentClassFocus] = useState(false);
  const [studentClassValue, setStudentClassValue] = useState("");
  const studentNumberInputRef = useRef(null);
  const studentNameInputRef = useRef(null);
  const studentClassSelectRef = useRef(null);

  useEffect(() => {
    if (studentNumberFocus) {
      studentNumberInputRef.current.focus();
    }
  }, [studentNumberFocus]);

  useEffect(() => {
    if (studentNameFocus) {
      studentNameInputRef.current.focus();
    }
  }, [studentNameFocus]);

  const handleStudentNumberFocus = () => {
    setStudentNumberFocus(true);
  };
  const handleStudentNumberBlur = () => {
    if (studentNumberFocus && !studentNumberInputRef.current.value) {
      setStudentNumberFocus(false);
    }
  };
  const handleStudentNumberChange = (e) => {
    setStudentNumberValue(e.target.value);
  };

  const handleStudentNameFocus = () => {
    setStudentNameFocus(true);
  };
  const handleStudentNameBlur = () => {
    if (studentNameFocus && !studentNameInputRef.current.value) {
      setStudentNameFocus(false);
    }
  };
  const handleStudentNameChange = (e) => {
    setStudentNameValue(e.target.value);
  };

  const handleStudentClassFocus = () => {
    setStudentClassFocus(true);
  };
  const handleStudentClassBlur = () => {
    if (studentClassFocus && !studentClassSelectRef.current.value) {
      setStudentClassFocus(false);
    }
  };
  const handleStudentClassChange = (e) => {
    setStudentClassValue(e.target.value);
  };

  const handleLoginSuccess = () => {
    // 登录成功后的操作...
    // 创建一个 URL 对象
    // const parsedUrl = new URL(pathname);

    // // 使用 URLSearchParams 获取查询参数
    // const redirectValue = parsedUrl.searchParams.get("redirect");

    // console.log("pathname.query.redirect", redirectValue);
    console.log("pathname", pathname, redirect);
    // console.log("pathname.query.redirect", pathname.query.redirect);
    const redirectUrl = redirect || "/";
    router.push(decodeURIComponent(redirectUrl));
  };

  return (
    <>
      <div id="title" className="flex flex-col justify-center items-center">
        <h1 className="text-[2rem] font-bold">河川生態保育學習</h1>
      </div>
      <div
        id="btnArea"
        className="flex flex-col w-[20rem] h-[25rem] text-gray-500 bg-white mt-[2rem] rounded px-4 py-20 gap-4"
      >
        <div className={`relative mb-4 ${studentNumberFocus ? "focus" : ""}`}>
          <input
            type="text"
            placeholder={studentNumberFocus ? "請輸入你的學號" : " "}
            onFocus={handleStudentNumberFocus}
            onBlur={handleStudentNumberBlur}
            onChange={(e) => handleStudentNumberChange(e)}
            ref={studentNumberInputRef}
            className="w-full py-4 px-3 rounded border outline-none"
          />
          <label
            htmlFor="passwordInput"
            onClick={() => setStudentNumberFocus(true)}
            className={`absolute transition-all duration-300 ${
              studentNumberFocus
                ? "-top-6 left-0 text-sm text-gray-600"
                : "top-4 left-2"
            }`}
          >
            學號
          </label>
        </div>
        <div className={`relative mb-4 ${studentNameFocus ? "focus" : ""}`}>
          <input
            type="text"
            placeholder={studentNameFocus ? "請輸入你的姓名" : " "}
            onFocus={handleStudentNameFocus}
            onBlur={handleStudentNameBlur}
            onChange={(e) => handleStudentNameChange(e)}
            ref={studentNameInputRef}
            className="w-full py-4 px-3 rounded border outline-none"
          />
          <label
            htmlFor="passwordInput"
            // onClick={() => setPasswordFocus(true)}
            className={`absolute transition-all duration-300 text-gray-500 ${
              studentNameFocus
                ? "-top-6 left-0 text-sm text-gray-600"
                : "top-4 left-2"
            }`}
          >
            姓名
          </label>
        </div>
        <div className={`relative mb-4 ${studentClassFocus ? "focus" : ""}`}>
          <select
            onFocus={handleStudentClassFocus}
            onBlur={handleStudentClassBlur}
            onChange={(e) => handleStudentClassChange(e)}
            ref={studentClassSelectRef}
            className="w-full py-4 px-3 rounded border outline-none"
          >
            {studentClassFocus ? (
              <>
                <option>{""}</option>
                <option>班級1</option>
                <option>班級2</option>
                <option>班級3</option>
              </>
            ) : (
              ""
            )}
          </select>
          <label
            htmlFor="passwordInput"
            onClick={() => handleStudentClassFocus(true)}
            className={`absolute transition-all duration-300 text-gray-500 ${
              studentClassFocus
                ? "-top-6 left-0 text-sm text-gray-600"
                : "top-4 left-2"
            }`}
          >
            班級
          </label>
        </div>
      </div>
      <button
        className="w-[10rem] h-[3rem] border-[2px] border-white text-lg text-white bg-primary_500 hover:bg-primary_200 font-bold py-2 px-4 rounded mt-[4rem]"
        onClick={() => {
          // router.push("/scanner");
          handleLoginSuccess();
        }}
      >
        下一步
      </button>
    </>
  );
}

export default TestHome;
