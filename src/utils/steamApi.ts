import { get } from "./utils";

// 定义表示 Steam 游戏数据的接口
interface PlayedGame {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
}

const BASE_URL = "http://api.steampowered.com";
const { STEAM_API_KEY, STEAM_ID } = import.meta.env;

export const playedGames = async (): Promise<PlayedGame[]> => {
  const path = "/IPlayerService/GetOwnedGames/v0001/";
  const res = await get(`${BASE_URL}${path}`, {
    key: STEAM_API_KEY,
    steamid: STEAM_ID,
    include_played_free_games: "true", // 包括免费游戏
    include_appinfo: "false", // 包括应用
  });
  return sortPlayedGame((await res?.json()).response.games);
};

const sortPlayedGame = (games: PlayedGame[]): PlayedGame[] => {
  return games.sort(
    (game1, game2) => game2.playtime_forever - game1.playtime_forever
  );
};

export const chineseImageUrl = (appid: string) => {
  return `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${appid}/header_schinese.jpg`;
};

export const chineseImage = async (appid: string) => {
  const res = await get(chineseImageUrl(appid));
  return res?.blob();
};
