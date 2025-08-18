import get from "axios";
import { ENABLE_REQUEST } from "astro:env/server";

const { STEAM_API_KEY, STEAM_ID } = import.meta.env;
if (ENABLE_REQUEST) {
  if (!STEAM_API_KEY) throw Error("STEAM_API_KEY not configured!");
  if (!STEAM_ID) throw Error("STEAM_ID not configured!");
}

// 定义表示 Steam 游戏数据的接口
export interface PlayedGame {
  appid: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
}

export interface MyPlayedGame extends PlayedGame {
  name: string;
  imgurl: string;
}

const API_URL = "https://api.steampowered.com";
const API_HTTP_URL = "http://api.steampowered.com";
const WEB_URL = "https://store.steampowered.com";
const CDN_URL = "https://shared.fastly.steamstatic.com";
const CF_CDN_URL = "https://cdn.cloudflare.steamstatic.com";

//获取我玩过的游戏列表
export const playedGames = async (): Promise<PlayedGame[]> => {
  const path = "/IPlayerService/GetOwnedGames/v0001/";
  const res = await get(`${API_URL}${path}`, {
    params: {
      key: STEAM_API_KEY,
      steamid: STEAM_ID,
      include_played_free_games: "true", // 包括免费游戏
      include_appinfo: "false", // 包括应用}
    },
  });
  const games = res.data.response.games;
  return await sortPlayedGame(games);
};

const sortPlayedGame = async (games: PlayedGame[]): Promise<PlayedGame[]> => {
  return games.sort(
    (game1, game2) => game2.playtime_forever - game1.playtime_forever
  );
};

//获取指定应用详情
export const appdetails = async (
  appids: string | string[],
  filters?: string | string[]
) => {
  const path = "/api/appdetails";
  const res = await get(`${WEB_URL}${path}`, {
    params: {
      appids,
      filters,
      l: "schinese",
      cc: "CN",
    },
  });
  return await res.data;
};

//获取指定应用中文封面url
export const chineseImageUrl = (appid: string) =>
  `${CF_CDN_URL}/steam/apps/${appid}/header_schinese.jpg`;
//获取指定应用封面url
export const imageUrl = (appid: string) =>
  `${CF_CDN_URL}/steam/apps/${appid}/header.jpg`;

//获取指定应用中文封面
export const chineseImage = async (appid: string) => {
  const res = await get(chineseImageUrl(appid));
  return res.data;
};
export const getGlobalAchievement = async (appid: string) => {
  const path = "ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/";
  const res = await get(`${API_URL}${path}`, {
    params: {
      gameid: appid,
    },
  });
  return await res.data;
};

export const getAppList = async () => {
  const path = "/ISteamApps/GetAppList/v2/";
  const res = await get(`${API_HTTP_URL}${path}`);
  return await res.data;
};
