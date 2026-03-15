import type { INavlink } from "./INavlink";

export interface INavroute extends INavlink {
  children?: INavlink[];
  isLogout?: boolean;
}
