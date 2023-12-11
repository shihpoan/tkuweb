import { atom } from "recoil";

// 0名稱、1地點、2系班級、3日期、4教官
export const autoCompleteTextFieldState = atom({
  key: "autoCompleteTextFieldState",
  default: ["", "", "", "", ""],
});

export const executionResultsState = atom({
  key: "executionResultsState",
  default: "",
});

export const picUrlState = atom({
  key: "picUrlState",
  default: [],
});

export const picDescState = atom({
  key: "picDescState",
  default: "",
});

export const studentInsightsState = atom({
  key: "studentInsightsState",
  default: "",
});
