import { ICONS } from "../data/icons";
import type { INavroute } from "../interface/nav/INavroute";
import { CLIENT_ROUTES } from "./client-routes";

export const NAVI: INavroute[] = [
  {
    to: CLIENT_ROUTES.PROTECTED.OVERVIEW,
    label: "Übersicht",
    img: ICONS.home,
  },
  {
    to: CLIENT_ROUTES.ROOT.REGISTER,
    label: "Planer",
    img: ICONS.calendar,
    children: [
      {
        to: CLIENT_ROUTES.ROOT.REGISTER,
        label: "- Raid Übersicht",
      },
      {
        to: CLIENT_ROUTES.ROOT.REGISTER,
        label: "- Raid Planen",
      },
    ],
  },
  {
    to: CLIENT_ROUTES.ROOT.REGISTER,
    label: "Post",
    img: ICONS.mail,
    children: [
      {
        to: CLIENT_ROUTES.ROOT.REGISTER,
        label: "- Eingang",
      },
      {
        to: CLIENT_ROUTES.ROOT.REGISTER,
        label: "- Ausgang",
      },
    ],
  },
  {
    to: CLIENT_ROUTES.PROTECTED.PROFILE,
    label: "Profil",
    img: ICONS.profile,
  },
  {
    to: CLIENT_ROUTES.ROOT.REGISTER,
    label: "Dashboard",
    img: ICONS.settings,
  },
  {
    to: CLIENT_ROUTES.ROOT.REGISTER,
    label: "Logout",
    img: ICONS.exit,
    logout: true,
    logoutFunc: () => {},
  },
];
