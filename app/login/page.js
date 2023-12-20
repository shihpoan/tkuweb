"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { setCookie, getCookies, deleteCookie } from "cookies-next";
import { useRecoilState } from "recoil";
import { isAccessTokenValid } from "@/atoms/accessTokenAtom.js";

import Link from "next/link";

import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Autocomplete from "@mui/joy/Autocomplete";

import { useNodePostApi } from "@/hooks/useNodeApi.js";

import CheckCircleOutlined from "@mui/icons-material/CheckCircleOutlined";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

function Login() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const cookies = getCookies();

  const [isAccessTokenValidState, setIsAccessTokenValidState] =
    useRecoilState(isAccessTokenValid);

  const [studentNumberValue, setStudentNumberValue] = useState("");
  const [studentNameValue, setStudentNameValue] = useState("");
  const [studentClassValue, setStudentClassValue] = useState("");

  const [isErrorLogin, setIsErrorLogin] = useState(false);

  const [isShowhPassword, setIsShownPassword] = useState(false);

  useEffect(() => {
    // console.log("students layout cookies", cookies);

    const _accessToken = cookies.acc_tku;
    if (_accessToken) {
      const redirectUrl = redirect || "students/riverGuides/overview";
      router.push(decodeURIComponent(redirectUrl));
    }
  }, [cookies]);

  const handleStudentNumberChange = (e) => {
    setStudentNumberValue(e.target.value);
  };
  const handleStudentNameChange = (e) => {
    setStudentNameValue(e.target.value);
  };
  const handleStudentClassChange = (e) => {
    setStudentClassValue(e.target.value);
  };
  const handleLoginSuccess = async () => {
    // 登录成功后的操作...

    try {
      const userDbDatas = await useNodePostApi("/auth/signin", {
        account: studentNumberValue,
        password: studentNameValue,
      });
      const userDatas = userDbDatas.data.data;
      const acc = userDatas.acc;
      const student_id = userDatas.user.account;
      const student_name = userDatas.user.name;
      const student_class = userDatas.user.class;
      const student_tier = userDatas.user.tier;
      // console.log("loginPage userData", userDatas);
      setCookie("acc_tku", acc, { maxAge: 60 * 60 * 2 });
      setCookie("student_id", student_id, { maxAge: 60 * 60 * 2 });
      setCookie("student_name", student_name, { maxAge: 60 * 60 * 2 });
      setCookie("student_class", student_class, { maxAge: 60 * 60 * 2 });
      setCookie("student_tier", student_tier, { maxAge: 60 * 60 * 2 });
      // console.log("pathname", pathname, redirect);
      // console.log("pathname.query.redirect", pathname.query.redirect);
      const redirectUrl = redirect || "students/riverGuides/overview";
      router.push(decodeURIComponent(redirectUrl));
    } catch (err) {
      setIsErrorLogin(true);
      console.log("err", err);
    }
  };

  const classes = [
    {
      label: "經濟1B",
      id: "class_0001",
    },
  ];

  // 原手刻功能，使用 Mui 原件取代
  // const [studentNumberFocus, setStudentNumberFocus] = useState(false);
  // const [studentNameFocus, setStudentNameFocus] = useState(false);
  // const [studentClassFocus, setStudentClassFocus] = useState(false);
  // const studentNumberInputRef = useRef(null);
  // const studentNameInputRef = useRef(null);
  // const studentClassSelectRef = useRef(null);
  // useEffect(() => {
  //   if (studentNumberFocus) {
  //     studentNumberInputRef.current.focus();
  //   }
  // }, [studentNumberFocus]);

  // useEffect(() => {
  //   if (studentNameFocus) {
  //     studentNameInputRef.current.focus();
  //   }
  // }, [studentNameFocus]);
  // const handleStudentNameFocus = () => {
  //   setStudentNameFocus(true);
  // };
  // const handleStudentNameBlur = () => {
  //   if (studentNameFocus && !studentNameInputRef.current.value) {
  //     setStudentNameFocus(false);
  //   }
  // };

  // const handleStudentClassFocus = () => {
  //   setStudentClassFocus(true);
  // };
  // const handleStudentClassBlur = () => {
  //   if (studentClassFocus && !studentClassSelectRef.current.value) {
  //     setStudentClassFocus(false);
  //   }
  // };

  // const handleStudentNumberFocus = () => {
  //   setStudentNumberFocus(true);
  // };
  // const handleStudentNumberBlur = () => {
  //   if (studentNumberFocus && !studentNumberInputRef.current.value) {
  //     setStudentNumberFocus(false);
  //   }
  // };

  return (
    <>
      <div id="title" className="flex flex-col justify-center items-center">
        <h1 className="text-[2rem] font-bold">河川生態保育學習</h1>
      </div>

      <div
        id="btnArea"
        className="relative flex flex-col w-[20rem] h-[25rem] text-gray-500 bg-white mt-[2rem] rounded px-4 py-20 gap-4"
      >
        <div
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-red-500 ${
            isErrorLogin ? "flex" : "hidden"
          }`}
        >
          登入錯誤
        </div>

        {/* <div className={`relative mb-4 ${studentNumberFocus ? "focus" : ""}`}>
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
        </div> */}
        <FormControl>
          <FormLabel>學號</FormLabel>
          <Input
            placeholder="請輸入你的學號"
            onChange={(e) => handleStudentNumberChange(e)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>密碼</FormLabel>
          <Input
            endDecorator={
              !isShowhPassword ? (
                <EyeSlashIcon
                  className="w-5 h-5"
                  onClick={() => setIsShownPassword(true)}
                />
              ) : (
                <EyeIcon
                  className="w-5 h-5"
                  onClick={() => setIsShownPassword(false)}
                />
              )
            }
            type={!isShowhPassword ? "password" : "text"}
            placeholder="請輸入你的姓名"
            onChange={(e) => handleStudentNameChange(e)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>班級</FormLabel>
          <Autocomplete
            placeholder="請輸入你的班級"
            options={classes}
            onChange={(e) => handleStudentClassChange(e)}
          />
        </FormControl>
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

export default Login;
