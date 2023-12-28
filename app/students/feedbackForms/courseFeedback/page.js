"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { getCookie } from "cookies-next";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Slider from "@mui/joy/Slider";
import { Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { useNodePostApi } from "@/hooks/useNodeApi.js";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const _id = searchParams.get("id");
  const teacher_id = searchParams.get("teacher_id");

  const [open, setOpen] = useState(false);

  // 問卷基本資料欄位
  const [backgroundInfo, setBackgroundInfo] = useState([
    "學號",
    "姓名",
    "班級",
    "性別",
    "宗教信仰",
    "志工服務經驗",
    "服務地點",
    "服務日期",
  ]);
  // 問卷基本資料欄位（值）
  const [backgroundInfoValue, setBackgroundInfoValue] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  // 問卷基本資料欄位（options）
  const [backgroundInfoOptions, setBackgroundInfoOptions] = useState([
    ["女 Female", "男 Male", "其他 Other"],
    [
      "天主教 Catholicism",
      "基督教 Christian",
      "佛教 Buddhism",
      "道教 Taoism",
      "無信仰 None",
      "其他信仰 Other",
    ],
    [
      "未滿1年 Less than one year",
      "1~3年 1 to 3 years",
      "超過3年 More than 3 years",
      "無 None",
      "其他 Other",
    ],
  ]);
  // 剩餘問題項目名稱
  const [otherQuestionsName, setOtherQuestionsName] = useState([]);
  // 剩餘問題分數
  const [otherQuestionsScore, setOtherQuestionsScore] = useState([]);
  // 當前問題 index
  const [nowQuestionIndex, setNowQuestionIndex] = useState(0);
  // 當前問題分數
  const [nowQuestionScore, setNowQuestionScore] = useState(0);

  const [isDesc0Hidden, setIsDesc0Hidden] = useState(true);
  const [isDescHidden, setIsDescHidden] = useState(true);

  // 基本資料 cookies
  useEffect(() => {
    const _studentId = getCookie("student_id");
    const _studentName = getCookie("student_name");
    const _studentClass = getCookie("student_class");
    const _bgInfo = [_studentId, _studentName, _studentClass, ""];
    setBackgroundInfoValue([..._bgInfo]);
  }, []);

  // OTHER Q
  useEffect(() => {
    const serviceLearningFeedback = [
      "我認為課程安排的服務內容是經過規劃設計的。I think the program content of the service is planned.",
      "我覺得這樣的課程安排，與校內打掃服務不同，對我有所助益。I think this kind of program arrangement, unlike the school cleaning service, is helpful to me.",
      "我認為和其它課程相比，這門課的執行難度較高。I think that compared with other courses, the implementation of this program is more difficult.",
      "進行服務前的專業培訓課程能增加我的專業知識。Pre-service professional training courses can increase my professional knowledge.",
      "我對這門課程的總體評價持肯定態度。I have a positive attitude towards the overall evaluation of this program.",
      "我覺得任課教師有充分解說課程內容，讓我在實作前能有所準備。I think the teacher gave a full explanation of the program content, so I'm prepared before the implementation.",
      "在前往機構服務前，教師對服務機構已進行詳細介紹。The teacher has introduced the service organization in detail before going to it.",
      "教師給予我們足夠的教學支援。Teachers give us enough teaching support.",
      "我覺得我和教師在課堂中的互動良好。I think the interaction between the teacher and me in the class is good.",
      "我覺得任課教師對於服務學習課程的教學態度認真負責。I think the instructor is serious and responsible for the teaching of the service learning course.",
      "我從服務學習課程中，學習到關心社區的需求與問題。I learned from the service learning course to care for the needs and problems of the community.",
      "我認為自己的服務對服務對象是有幫助的。I think my service is helpful to the service recipients.",
      "透過本次服務學習，提升我的人際相處能力。Through this service learning, I enhanced my interpersonal skills.",
      "服務過程中我不在意得到物質回饋。I do not care about receiving material rewards during the service process.",
      "服務過程中，我能以得體有禮的方式與人互動。During the service process, I can interact with others in a proper and polite manner.",
      "我能從服務學習課程中，學習尊重不同於自己生活背景的人。From the service learning course, I learned to respect people with different life backgrounds.",
      "透過服務學習課程，可以讓我體悟到「從服務-到學習」歷程的感動。Through the service learning course, I can appreciate the emotional journey from 'service to learning'.",
      "透過服務學習反思，我覺得可以從不同角度去思考問題。Through reflection in service learning, I feel that I can consider issues from various perspectives.",
      "透過服務學習反思，我覺得可以接受不一樣的意見。Through reflection in service learning, I think I can accept different opinions.",
      "透過服務學習反思，我覺得可以改變自己。Reflecting through service learning, I think I can change myself.",
      "未來大學三年我會再修習服務學習之相關課程。In the next three years of university, I will take more service learning courses.",
      "以後若有服務學習的相關活動，我願意主動參加。If there are any service learning activities in the future, I am willing to participate actively.",
      "未來我會鼓勵其他人參與相關服務活動。In the future, I will encourage others to engage in related service activities.",
      "我能從服務學習課程中，培養「責任感」。From the service learning course, I can develop a 'sense of responsibility'.",
      "我能從服務學習課程中，培養「公民意識」。From the service learning course, I can cultivate 'civic consciousness'.",
    ];
    setOtherQuestionsName([...serviceLearningFeedback]);

    let _otherQuestionsScore = [];
    serviceLearningFeedback.forEach((f) => {
      _otherQuestionsScore.push(3);
    });
    setOtherQuestionsScore([..._otherQuestionsScore]);
  }, []);

  const handleBgInfoChange = (value, index) => {
    let _willUpdateDatas = [...backgroundInfoValue];
    _willUpdateDatas[index] = value;

    setBackgroundInfoValue([..._willUpdateDatas]);

    console.log("_willUpdateDatas", _willUpdateDatas);
  };

  // autoComplete 的 change
  const handleOtherScoreChange = (score, index) => {
    let _willUpdateDatas = [...otherQuestionsScore];
    _willUpdateDatas[index] = score;

    setOtherQuestionsScore([..._willUpdateDatas]);
    console.log("_willUpdateDatasother", _willUpdateDatas);
  };

  async function onHandleSubmit() {
    const scoreReducer = otherQuestionsScore.reduce((acc, curr) => {
      acc += curr;
      return acc;
    }, 0);

    const _willUpdateDatas = {
      student_id: backgroundInfoValue[0],
      student_name: backgroundInfoValue[1],
      class: backgroundInfoValue[2],
      gender: backgroundInfoValue[3],
      religion: backgroundInfoValue[4],
      experience: backgroundInfoValue[5],
      place: backgroundInfoValue[6],
      date: backgroundInfoValue[7],
      score: [...otherQuestionsScore],
      totalScore: scoreReducer,
      course_id: _id,
      teacher_id: teacher_id,
    };
    try {
      await useNodePostApi(
        "/api/courseFeedback/newCourseFeedback",
        _willUpdateDatas
      );
      console.log("ok");
      setOpen(true);
      setTimeout(() => {
        router.push(`/students/courseRecords/workspace?id=${_id}`);
      }, [1500]);
    } catch (err) {
      console.log("err", err);
    }
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <div
        id="contents"
        className="flex flex-col flex-grow w-full h-max text-xl justify-start items-center px-8 gap-2"
      >
        <div
          id="resultDesc1"
          className="flex flex-col w-full h-max text-sm text-justify gap-2"
        >
          <div className="flex gap-2 items-center">
            <li>說明</li>
            <ChevronDownIcon
              className="w-3 h-3"
              onClick={() => setIsDesc0Hidden(!isDesc0Hidden)}
            />
          </div>
          {isDesc0Hidden ? null : (
            <div className="flex flex-wrap text-base text-justify">
              <p>
                親愛的同學：
                服務學習是一種結合服務與學習的教學法，其基本理念為透過在社區機構服務的過程中，將知識與經驗融為一體，提昇同學參與公共事務的熱忱與理想。
                為了使服務學習在本校深化紮根，希望各位在大學新鮮人的這一年，能透過此課程來認識多元文化社會，建立公民責任與服務利他的人生價值觀。
                期望各位同學能用心回答，俾使我們能得到最正確之資料，成為課程規劃與修正之依據。
                淡江大學服務學習執行小組 敬上
              </p>
              <p>
                Dear classmates: Service learning is a combination of service
                and learning teaching method, the basic idea of the community
                through the process of institutional services, knowledge and
                experience will be integrated to enhance students to participate
                in public affairs enthusiasm and ideals. In order to make
                service learning deepen in our school, we hope that you will be
                able to understand the multicultural society and establish civic
                responsibility and service altruistic values through this
                course. Please answer carefully, so that we can get the most
                accurate information to improve the follow on class.
              </p>
              Dear classmates: Service learning is a combination of service and
              learning teaching method, the basic idea of the community through
              the process of institutional services, knowledge and experience
              will be integrated to enhance students to participate in public
              affairs enthusiasm and ideals. In order to make service learning
              deepen in our school, we hope that you will be able to understand
              the multicultural society and establish civic responsibility and
              service altruistic values through this course. Please answer
              carefully, so that we can get the most accurate information to
              improve the follow on class.
            </div>
          )}
        </div>
        <div
          id="contents"
          className="flex flex-wrap w-full h-max justify-start gap-1"
        >
          {backgroundInfo.map((btn, inputIdx) =>
            inputIdx <= 2 || inputIdx >= 6 ? (
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
                label={backgroundInfo[inputIdx]}
                variant="filled"
                value={backgroundInfoValue[inputIdx]}
                onChange={(e) => {
                  if (inputIdx >= 6)
                    handleBgInfoChange(e.target.value, inputIdx);
                }}
              />
            ) : (
              <Autocomplete
                disablePortal
                id="otherQ"
                options={backgroundInfoOptions[inputIdx - 3]}
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
                    label={backgroundInfo[inputIdx]}
                    variant="filled"
                  />
                )}
                onChange={(e, value) => {
                  handleBgInfoChange(value, inputIdx);
                }}
              />
            )
          )}
        </div>
        <div
          id="resultDesc1"
          className="flex flex-col w-full h-max text-sm text-justify gap-2"
        >
          <div className="flex gap-2 items-center">
            <li>課程設計部分滿意度填表說明</li>
            <ChevronDownIcon
              className="w-3 h-3"
              onClick={() => setIsDescHidden(!isDescHidden)}
            />
          </div>
          {isDescHidden ? null : (
            <>
              <p>
                請您逐項表達自己目前之想法或行為的程度，請您依題目內容符合程度，選擇適當方格。請不必做過多的考慮，第一個反應通常就是最好的答案。1代表非常不滿意
                6代表 非常滿意
              </p>
              <p>
                Please indicate your current idea or behavior, please click ""
                in the appropriate box according to the degree of content.
                Please do not have too much consideration, the first reaction is
                usually the best answer. (Agree6 to disagree1)
              </p>
            </>
          )}
        </div>
        <div id="Q" className="flex flex-col w-full h-max text-xl gap-4">
          {otherQuestionsName.map((q, qIdx) => (
            <div key={qIdx} className="h-max">
              <p className="font-bold">{`第 ${qIdx + 1} 題` + ". " + q}</p>
              <Box sx={{ width: 300 }}>
                <Slider
                  aria-label="Small steps"
                  defaultValue={3}
                  // getAriaValueText={"valueText"}
                  step={1}
                  marks={[
                    {
                      value: 0,
                      label: "0",
                    },
                    {
                      value: 1,
                      label: "1",
                    },
                    {
                      value: 2,
                      label: "2",
                    },
                    {
                      value: 3,
                      label: "3",
                    },
                    {
                      value: 4,
                      label: "4",
                    },
                    {
                      value: 5,
                      label: "5",
                    },
                    {
                      value: 6,
                      label: "6",
                    },
                  ]}
                  min={0}
                  max={6}
                  valueLabelDisplay="auto"
                  value={otherQuestionsScore[qIdx]}
                  onChange={(e) => handleOtherScoreChange(e.target.value, qIdx)}
                />
              </Box>
            </div>
          ))}
        </div>
      </div>
      <div
        id="footer"
        className="flex flex-col w-[100%] min-h-[15%] justify-center items-center gap-2"
      >
        <button
          className="flex w-[8rem] h-[2rem] rounded border-[1px] bg-white border-gray-500 text-lg text-primary_500 justify-center items-center"
          onClick={() => {
            onHandleSubmit();
          }}
        >
          提交
        </button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            提交成功
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}

export default page;
