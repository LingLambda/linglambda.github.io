type Heading = {
  depth: number;
  slug: string;
  text: string;
};

// 定义表示 Steam 游戏数据的接口
type PlayedGame = {
  appid: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
};

type Message = {
  index: string;
  btnName: string;
  content: string;
};

export class ToastMessageEvent extends Event {
  constructor(
    type: string,
    public index: string,
    public text: string,
    eventInitDict?: EventInit
  ) {
    super(type, eventInitDict);
  }
}
