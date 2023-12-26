"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { useRecoilState, useRecoilValue } from "recoil";
// 問卷基本選擇欄位、獨立欄位
import {
  baseOptionsNameArrState,
  ccsoOptionsNameArrState,
} from "@/atoms/surveyFieldLabelsAtom.js";
import {
  baseOptionsValueArrState,
  ccsoOptionsValueArrState,
} from "@/atoms/surveyFieldOptionsAtom.js";
import {
  autoCompleteTextFieldState,
  executionResultsState,
  picUrlState,
  picDescState,
  studentInsightsState,
} from "@/atoms/ccsoTempDatasAtoms.js";

import MultiFileUpload from "@/components/MultiFileUpload.js";
import { getCookie } from "cookies-next";

function page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const _id = searchParams.get("id");

  // 問卷基本選擇欄位
  const baseSelectNameArr = useRecoilValue(baseOptionsNameArrState);
  // 問卷基本選擇欄位（值）
  const baseSelectValueArr = useRecoilValue(baseOptionsValueArrState);
  // 個別問卷獨立選擇欄位
  const otherSelectNameArr = useRecoilValue(ccsoOptionsNameArrState);
  // 個別問卷獨立選擇欄位（值）
  const otherSelectValueArr = useRecoilValue(ccsoOptionsValueArrState);

  // 其餘填寫之個別問卷 text
  const [autoCompleteTextField, setAutoCompleteTextField] = useRecoilState(
    autoCompleteTextFieldState
  );
  const [executionResults, setExecutionResults] = useRecoilState(
    executionResultsState
  );
  const [picUrl, setPicUrl] = useRecoilState(picUrlState);
  const [picDesc, setPicDesc] = useRecoilState(picDescState);
  const [studentInsights, setStudentInsightsState] =
    useRecoilState(studentInsightsState);

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
      <div
        id="contents"
        className="flex flex-col flex-grow w-full h-max text-xl justify-start items-center px-8 gap-2"
      >
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
                sx={{
                  width: "49%",
                  backgroundColor: "white",
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
          <Autocomplete
            disablePortal
            id="otherQ"
            options={otherSelectValueArr[0]}
            value={autoCompleteTextField[4]}
            sx={{
              width: "49%",
              backgroundColor: "white",
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
                label={otherSelectNameArr[0]}
                variant="filled"
              />
            )}
            onChange={(e, value) => handleChange(value, 4)}
          />
        </div>
        <div id="resultDesc1" className="flex flex-col w-full h-max gap-2">
          <p>執行成果重點說明</p>
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
            value={executionResults}
            onChange={(e) => {
              setExecutionResults(e.target.value);
            }}
          />
        </div>
        <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
          <p>上傳照片</p>
          <MultiFileUpload />
        </div>

        <div id="resultDesc3" className="flex flex-col w-full h-max gap-2">
          <p>成果照片相關說明</p>
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
            value={picDesc}
            onChange={(e) => {
              setPicDesc(e.target.value);
            }}
          />
        </div>
        <div id="resultDesc4" className="flex flex-col w-full h-max gap-2">
          <p>學生心得</p>
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
            value={studentInsights}
            onChange={(e) => {
              setStudentInsightsState(e.target.value);
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
              `/students/courseRecords/workspace/preview/ccso?id=${_id}`
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
