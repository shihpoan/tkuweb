import { atom } from "recoil";

// 問卷基本選擇欄位名稱
export const baseOptionsValueArrState = atom({
  key: "baseOptionsValueArrState",
  default: {
    0: ["河川生態保育課程"],
    1: ["庄子后溪"],
    2: ["經濟一B"],
  },
});

// 個別問卷獨立選擇欄位名稱：ccso
export const ccsoOptionsValueArrState = atom({
  key: "optionsNameArrState",
  default: {
    0: ["沈大鈞", "胡菊芬"],
  },
});
