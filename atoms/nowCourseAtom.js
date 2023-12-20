import { atom } from "recoil";

// 問卷基本選擇欄位名稱
export const nowSelectedCourseState = atom({
  key: "nowSelectedCourseState",
  default: "",
});
