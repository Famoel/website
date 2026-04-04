export const SERVER_ROUTES = {
  AUTH: {
    REGISTER_USER: "/auth/register-user",
    LOGIN_USER: "/auth/login-user",
  },

  SESSION: {
    START_SESSION: "/session/start",
    CHECK_SESSION: "/session/check",
  },

  CHAT: {
    SEND: "/chat/send",
    DATA: "/chat/data",
  },

  CLASS_LIST: {
    GET_CLASS_LIST: "/class-list/get-class-list",
  },

  USER_CHARACTER: {
    USER_CHARACTER_LIST: "/user-character/user-character-list",
    CREATE_CHARACTER: "/user-character/create-character",
    UPDATE_CHARACTER: "/user-character/update-character",
    DELETE_CHARACTER: "/user-character/delete-character",
  },

  PLANER: {
    RAID: {
      GET_RAID_LIST: "/planer/raid/get-raid-list",
      GET_RAID_PLAN: "/planer/raid/get-raid-plan",
      GET_RAID_ENTRYS: "/planer/raid/get-raid-entrys",
      CREATE_RAID_PLAN: "/planer/raid/create-raid-plan",
      ENTER_RAID: "/planer/raid/enter-raid",
    },
  },
};
