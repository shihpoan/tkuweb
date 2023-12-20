"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation.js";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { getCookie } from "cookies-next";

import { useRecoilState, useRecoilValue } from "recoil";
// 問卷基本選擇欄位、獨立欄位
import {
  baseOptionsNameArrState,
  slOptionsNameArrState,
} from "@/atoms/surveyFieldLabelsAtom.js";
import { baseOptionsValueArrState } from "@/atoms/surveyFieldOptionsAtom.js";
import {
  slAutoCompleteTextFieldState,
  dataPresentationMethodState,
  serviceContentAndLearningPointsState,
  serviceReflectionState,
  moodJournalState,
} from "@/atoms/slTempDatasAtoms.js";

function page() {
  const router = useRouter();

  // 問卷基本選擇欄位
  const baseSelectNameArr = useRecoilValue(baseOptionsNameArrState);
  // 問卷基本選擇欄位（值）
  const baseSelectValueArr = useRecoilValue(baseOptionsValueArrState);
  // 個別問卷獨立選擇欄位
  const otherSelectNameArr = useRecoilValue(slOptionsNameArrState);

  // 其餘填寫之個別問卷 text
  const [autoCompleteTextField, setAutoCompleteTextField] = useRecoilState(
    slAutoCompleteTextFieldState
  );
  const [dataPresentationMethod, setDataPresentationMethod] = useRecoilState(
    dataPresentationMethodState
  );
  const [serviceContentAndLearningPoints, setServiceContentAndLearningPoints] =
    useRecoilState(serviceContentAndLearningPointsState);
  const [serviceReflection, setServiceReflection] = useRecoilState(
    serviceReflectionState
  );
  const [moodJournal, setMoodJournal] = useRecoilState(moodJournalState);

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
                readOnly={inputIdx < 3}
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
          <p>資料呈現方式</p>
          <TextareaAutosize
            minRows={1}
            style={{
              width: "100%",
              border: "1px solid #125C66",
              borderRadius: "5px",
              color: "black",
              padding: "10px 10px 10px 10px",
            }}
            placeholder="請輸入内容..."
            value={dataPresentationMethod}
            onChange={(e) => {
              setDataPresentationMethod(e.target.value);
            }}
          />
        </div>
        <div id="resultDesc2" className="flex flex-col w-full h-max gap-2">
          <p>服務內容與學習要點</p>
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
            value={serviceContentAndLearningPoints}
            onChange={(e) => {
              setServiceContentAndLearningPoints(e.target.value);
            }}
          />
        </div>
        <div id="resultDesc3" className="flex flex-col w-full h-max gap-2">
          <p>服務反思</p>
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
            value={serviceReflection}
            onChange={(e) => {
              setServiceReflection(e.target.value);
            }}
          />
        </div>
        <div id="resultDesc4" className="flex flex-col w-full h-max gap-2">
          <p>心得隨寫</p>
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
            value={moodJournal}
            onChange={(e) => {
              setMoodJournal(e.target.value);
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
              `/students/courseRecords/workspace/preview/serviceLogs`
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
