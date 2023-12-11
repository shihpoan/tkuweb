import { atom } from "recoil";

// 0名稱、1地點、2系班級、3日期、4時數、5服務人數、6服務機構
export const slAutoCompleteTextFieldState = atom({
  key: "slAutoCompleteTextFieldState",
  default: ["", "", "", "", "", "", ""],
});

// 数据呈现方式
export const dataPresentationMethodState = atom({
  key: "dataPresentationMethodState",
  default: "", // 默认为空字符串，表示尚未选择呈现方式
});

// 服务内容与学习要点
export const serviceContentAndLearningPointsState = atom({
  key: "serviceContentAndLearningPointsState",
  default: "", // 默认为空字符串，用户将输入服务内容与学习要点
});

// 服务反思
export const serviceReflectionState = atom({
  key: "serviceReflectionState",
  default: "", // 默认为空字符串，用于记录服务后的反思
});

// 心情随写
export const moodJournalState = atom({
  key: "moodJournalState",
  default: "", // 默认为空字符串，用于记录随时的心情变化
});
