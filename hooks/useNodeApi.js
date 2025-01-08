import axios from "axios";

const nodeServerPath = "http://localhost:8000";
// const nodeServerPath = "https://tku.node.zhshihpoan.com";

// apis
async function useNodeGetApi(apiPath, apiObj) {
  return await axios.get(`${nodeServerPath}${apiPath}`, {
    withCredentials: true,
  });
}

async function useNodeGetImageApi(apiPath, apiObj) {
  return await axios.get(`${nodeServerPath}${apiPath}`, {
    withCredentials: true,
    responseType: "blob",
  });
}

async function useNodePostApi(apiPath, apiObj) {
  return await axios.post(`${nodeServerPath}${apiPath}`, apiObj, {
    withCredentials: true,
  });
}

async function useNodePostImageApi(apiPath, apiObj) {
  return await axios.post(`${nodeServerPath}${apiPath}`, apiObj, {
    withCredentials: true,
    responseType: "blob",
  });
}

async function useNodePatchApi(apiPath, apiObj) {
  return await axios.patch(`${nodeServerPath}${apiPath}`, apiObj, {
    withCredentials: true,
  });
}

async function useNodeDeleteApi(apiPath, apiObj) {
  return await axios.delete(`${nodeServerPath}${apiPath}`, {
    withCredentials: true,
  });
}

// 匯出所有函數（命名導出）
export {
  useNodeGetApi,
  useNodeGetImageApi,
  useNodePostApi,
  useNodePostImageApi,
  useNodePatchApi,
  useNodeDeleteApi,
};

// 如果需要預設導出，可以改成這樣：
// export default {
//   useNodeGetApi,
//   useNodeGetImageApi,
//   useNodePostApi,
//   useNodePostImageApi,
//   useNodePatchApi,
//   useNodeDeleteApi,
// };
