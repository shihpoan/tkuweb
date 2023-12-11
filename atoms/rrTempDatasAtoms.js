import { atom } from "recoil";

// 0名稱、1地點、2系班級、3日期、4主持人、5紀錄
export const rrAutoCompleteTextFieldState = atom({
  key: "rrAutoCompleteTextFieldState",
  default: ["", "", "", "", "", ""],
});

// 參與人員
export const participantsState = atom({
  key: "participantsState",
  default: "", // 默认为空数组，适用于初始无参与人员的情况
});

// 討論主題與內容
export const discussionTopicAndContentState = atom({
  key: "discussionTopicAndContentState",
  default: "", // 默认为空字符串，用于记录讨论的主题和内容
});
