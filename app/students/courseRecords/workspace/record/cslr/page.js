"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useRecoilState, useRecoilValue } from "recoil";
// 問卷基本選擇欄位、獨立欄位
import {
  baseOptionsNameArrState,
  cslrOptionsNameArrState,
} from "@/atoms/surveyFieldLabelsAtom.js";
import { baseOptionsValueArrState } from "@/atoms/surveyFieldOptionsAtom.js";
import {
  cslrAutoCompleteTextFieldState,
  q1State,
  q2State,
  q3State,
  q4State,
  q5State,
  q6State,
} from "@/atoms/cslrTempDatasAtoms.js";
import { nowSelectedCourseState } from "@/atoms/nowCourseAtom.js";

import { getCookie } from "cookies-next";

function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const _id = searchParams.get("id");
  const teacher_id = searchParams.get("teacher_id");

  // 問卷基本選擇欄位
  const baseSelectNameArr = useRecoilValue(baseOptionsNameArrState);
  // 問卷基本選擇欄位（值）
  const baseSelectValueArr = useRecoilValue(baseOptionsValueArrState);
  // 個別問卷獨立選擇欄位
  const otherSelectNameArr = useRecoilValue(cslrOptionsNameArrState);

  // 其餘填寫之個別問卷 text
  const [autoCompleteTextField, setAutoCompleteTextField] = useRecoilState(
    cslrAutoCompleteTextFieldState
  );
  const [q1, setQ1] = useRecoilState(q1State);
  const [q2, setQ2] = useRecoilState(q2State);
  const [q3, setQ3] = useRecoilState(q3State);
  const [q4, setQ4] = useRecoilState(q4State);
  const [q5, setQ5] = useRecoilState(q5State);
  const [q6, setQ6] = useRecoilState(q6State);

  useEffect(() => {
    const _selectedCourse = getCookie("selected_course");
    const _selectedClass = getCookie("student_class");
    let _autoCompleteTextField = [...autoCompleteTextField];
    _autoCompleteTextField[1] = _selectedCourse;
    _autoCompleteTextField[2] = _selectedClass;
    setAutoCompleteTextField(...[_autoCompleteTextField]);
  }, []);

  // autoComplete 的 change
  const handleChange = (newValue, index) => {
    let _willUpdateArr = [...autoCompleteTextField];
    _willUpdateArr[index] = newValue;
    setAutoCompleteTextField([..._willUpdateArr]);
    console.log("_willUpdateArr", _willUpdateArr);
  };

  return (
    <>
      <div className="flex flex-col flex-grow w-full h-max text-xl justify-start items-center px-8 gap-2">
        <div
          id="contents"
          className="flex flex-wrap w-full h-max justify-start gap-1"
        >
          {baseSelectNameArr.map((btn, inputIdx) =>
            inputIdx != 3 ? (
              <Autocomplete
                key={inputIdx}
                disablePortal
                id="baseQ"
                options={baseSelectValueArr[inputIdx]}
                value={autoCompleteTextField[inputIdx]}
                readOnly={inputIdx < 3}
                sx={{
                  width: "49%",
                  backgroundColor: "white",
                  zIndex: 0,
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      "& .MuiInputLabel-shrink": {
                        color: "#125C66", // 有值时的标签颜色
                      },
                      "& label.Mui-focused": {
                        color: "#125C66", // 聚焦时的颜色
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderWidth: 0,
                        },
                        "&.Mui-focused": {
                          "& fieldset": {
                            border: 0, // 聚焦時的邊框顏色
                          },
                        },
                      },
                    }}
                    label={baseSelectNameArr[inputIdx]}
                    variant="filled"
                    value={"ppp"}
                  />
                )}
                onChange={(e, value) => handleChange(value, inputIdx)}
              />
            ) : (
              <TextField
                key={inputIdx}
                sx={{
                  width: "49%",
                  backgroundColor: "white",
                  "& .MuiInputLabel-shrink": {
                    color: "#125C66", // 有值时的标签颜色
                  },
                  "& label.Mui-focused": {
                    color: "#125C66", // 聚焦时的颜色
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderWidth: 0,
                    },
                    "&.Mui-focused": {
                      "& fieldset": {
                        border: 0, // 聚焦時的邊框顏色
                      },
                    },
                  },
                }}
                label={baseSelectNameArr[inputIdx]}
                variant="filled"
                placeholder={inputIdx == 3 ? "2023.11.30" : ""}
                value={autoCompleteTextField[inputIdx]}
                onChange={(e) => handleChange(e.target.value, inputIdx)}
              />
            )
          )}
          {otherSelectNameArr.map((btn, inputIdx) => (
            <TextField
              key={inputIdx + 4}
              sx={{
                width: "49%",
                backgroundColor: "white",
                "& .MuiInputLabel-shrink": {
                  color: "#125C66", // 有值时的标签颜色
                },
                "& label.Mui-focused": {
                  color: "#125C66", // 聚焦时的颜色
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderWidth: 0,
                  },
                  "&.Mui-focused": {
                    "& fieldset": {
                      border: 0, // 聚焦時的邊框顏色
                    },
                  },
                },
              }}
              label={otherSelectNameArr[inputIdx]}
              variant="filled"
              value={autoCompleteTextField[inputIdx + 4]}
              onChange={(e) => handleChange(e.target.value, inputIdx + 4)}
            />
          ))}
        </div>
        <div id="resultDesc1" className="flex flex-col w-full h-max gap-2">
          <p>在本次社區服務中，你印象最深刻的畫面是什麼？為什麼？</p>
          <TextareaAutosize
            minRows={3}
            style={{
              width: "100%",
              border: "1px solid #125C66",
              borderRadius: "5px",
              color: "black",
              padding: "10px 10px 10px 10px",
            }}
            placeholder="請輸入内容..."
            value={q1}
            onChange={(e) => {
              setQ1(e.target.value);
            }}
          />
        </div>
        <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
          <p>
            對你而言，這次的社區服務有什麼意義？在本次社區服務後，你願不願意參與更多的志工服務？
          </p>
          <TextareaAutosize
            minRows={3}
            style={{
              width: "100%",
              border: "1px solid #125C66",
              borderRadius: "5px",
              color: "black",
              padding: "10px 10px 10px 10px",
            }}
            placeholder="請輸入内容..."
            value={q2}
            onChange={(e) => {
              setQ2(e.target.value);
            }}
          />
        </div>
        <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
          <p>請用一句話來形容本學期參與社區服務的感覺，為什麼是這句話？</p>
          <TextareaAutosize
            minRows={3}
            style={{
              width: "100%",
              border: "1px solid #125C66",
              borderRadius: "5px",
              color: "black",
              padding: "10px 10px 10px 10px",
            }}
            placeholder="請輸入内容..."
            value={q3}
            onChange={(e) => {
              setQ3(e.target.value);
            }}
          />
        </div>
        <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
          <p>在本次社區服務裡，你覺得感到最具挑戰性的地方是什麼？為什麼？</p>
          <TextareaAutosize
            minRows={3}
            style={{
              width: "100%",
              border: "1px solid #125C66",
              borderRadius: "5px",
              color: "black",
              padding: "10px 10px 10px 10px",
            }}
            placeholder="請輸入内容..."
            value={q4}
            onChange={(e) => {
              setQ4(e.target.value);
            }}
          />
        </div>
        <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
          <p>在這個社區服務中，你對自己有什麼新的認識？</p>
          <TextareaAutosize
            minRows={3}
            style={{
              width: "100%",
              border: "1px solid #125C66",
              borderRadius: "5px",
              color: "black",
              padding: "10px 10px 10px 10px",
            }}
            placeholder="請輸入内容..."
            value={q5}
            onChange={(e) => {
              setQ5(e.target.value);
            }}
          />
        </div>
        <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
          <p>在這次社區服務中，你覺得我們有沒有什麼可以更努力的地方？</p>
          <TextareaAutosize
            minRows={3}
            style={{
              width: "100%",
              border: "1px solid #125C66",
              borderRadius: "5px",
              color: "black",
              padding: "10px 10px 10px 10px",
            }}
            placeholder="請輸入内容..."
            value={q6}
            onChange={(e) => {
              setQ6(e.target.value);
            }}
          />
        </div>
      </div>
      <div
        id="footer"
        className="flex flex-col w-[100%] min-h-[15%] justify-center items-center gap-2"
      >
        <button
          className="flex w-[8rem] h-[2rem] rounded border-[1px] bg-white border-gray-500 text-lg text-primary_500 justify-center items-center"
          onClick={() => {
            router.push(
              `/students/courseRecords/workspace/preview/cslr?id=${_id}&teacher_id=${teacher_id}`
            );
          }}
        >
          提交
        </button>
      </div>
    </>
  );
}

export default page;
