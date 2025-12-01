import get from "axios";
const API_URL = "https://ff.llma.dev";
// 自个搭的阴间服务，有兴趣可以直接问我
export const getFfPlayTime = async () => {
  const path = "/llmaget/ff_info";
  const res = await get(`${API_URL}${path}`);
  return res.data.data.play_time;
};
