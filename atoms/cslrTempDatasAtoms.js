import { atom } from "recoil";

// 0名稱、1地點、2系班級、3日期、4主持人、5紀錄
export const cslrAutoCompleteTextFieldState = atom({
  key: "cslrAutoCompleteTextFieldState",
  default: ["", "", "", "", "", ""],
});

// 在本次社區服務中，你印象最深刻的畫面是什麼？為什麼？
export const q1State = atom({
  key: "q1",
  default: "", // 默认为空字符串
});

// 對你而言，這次的社區服務有什麼意義？在本次社區服務後，你願不願意參與更多的志工服務？
export const q2State = atom({
  key: "q2",
  default: "", // 默认为空字符串
});

// 請用一句話來形容本學期參與社區服務的感覺，為什麼是這句話？
export const q3State = atom({
  key: "q3",
  default: "", // 默认为空字符串
});

// 在本次社區服務裡，你覺得感到最具挑戰性的地方是什麼？為什麼？
export const q4State = atom({
  key: "q4",
  default: "", // 默认为空字符串
});

// 在這個社區服務中，你對自己有什麼新的認識？
export const q5State = atom({
  key: "q5",
  default: "", // 默认为空字符串
});

// 在這次社區服務中，你覺得我們有沒有什麼可以更努力的地方？
export const q6State = atom({
  key: "q6",
  default: "", // 默认为空字符串
});
