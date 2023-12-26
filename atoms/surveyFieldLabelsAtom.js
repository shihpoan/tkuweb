import { atom } from "recoil";

// 問卷基本選擇欄位名稱
export const baseOptionsNameArrState = atom({
  key: "baseOptionsNameArrState",
  default: ["課程名稱", "課程地點", "系級/班級", "課程日期"],
});

// 個別問卷獨立選擇欄位名稱：ccso(服務成果表)
export const ccsoOptionsNameArrState = atom({
  key: "ccsoOptionsNameArrState",
  default: ["任課教官"],
});

// 個別問卷獨立選擇欄位名稱：sl(服務日誌)
export const slOptionsNameArrState = atom({
  key: "slOptionsNameArrState",
  default: ["服務時數", "被服務人數", "服務機構"],
});

// 個別問卷獨立選擇欄位名稱：rr(反思紀錄表)
export const rrOptionsNameArrState = atom({
  key: "rrOptionsNameArrState",
  default: ["授課老師", "紀錄"],
});

// 個別問卷獨立選擇欄位名稱：(學習歷程反思單)
export const cslrOptionsNameArrState = atom({
  key: "cslrOptionsNameArrState",
  default: ["學年", "學期"],
});
