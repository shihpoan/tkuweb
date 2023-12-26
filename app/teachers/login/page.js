"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { setCookie, getCookies, deleteCookie } from "cookies-next";

import Link from "next/link";

import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import Autocomplete from "@mui/joy/Autocomplete";

import { useNodePostApi } from "@/hooks/useNodeApi.js";

import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

function Login() {
  const router = useRouter();
  const cookies = getCookies();

  const [teacherNumberValue, setTeacherNumberValue] = useState("");
  const [teacherNameValue, setTeacherNameValue] = useState("");

  const [isErrorLogin, setIsErrorLogin] = useState(false);

  const [isShowhPassword, setIsShownPassword] = useState(false);

  const handleStudentNumberChange = (e) => {
    setTeacherNumberValue(e.target.value);
  };
  const handleStudentNameChange = (e) => {
    setTeacherNameValue(e.target.value);
  };
  const handleLoginSuccess = async () => {
    // 登录成功后的操作...

    try {
      const userDbDatas = await useNodePostApi("/auth/signin", {
        account: teacherNumberValue,
        password: teacherNameValue,
      });
      const userDatas = userDbDatas.data.data;
      const acc = userDatas.acc;
      const teacher_id = userDatas.user.account;
      const teacher_name = userDatas.user.name;
      // console.log("loginPage userData", userDatas);
      setCookie("acc_tku", acc, { maxAge: 60 * 60 * 2 });
      setCookie("teacher_id", teacher_id, { maxAge: 60 * 60 * 2 });
      setCookie("teacher_name", teacher_name, { maxAge: 60 * 60 * 2 });
      // console.log("pathname", pathname, redirect);
      // console.log("pathname.query.redirect", pathname.query.redirect);
      const redirectUrl = "teachers/home";
      router.push(decodeURIComponent(redirectUrl));
    } catch (err) {
      setIsErrorLogin(true);
      console.log("err", err);
    }
  };

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
        <FormControl>
          <FormLabel>帳號</FormLabel>
          <Input
            placeholder="請輸入您的帳號"
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
            placeholder="請輸入您的密碼"
            onChange={(e) => handleStudentNameChange(e)}
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
