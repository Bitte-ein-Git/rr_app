import { MantineSize } from "@mantine/core";

/* Settings Defaults */
export const SETTINGS_COLORSCHEME: "light" | "dark" = "light";
export const SETTINGS_REFRESHINTERVAL: number = 120;

/* Layout & Sizes */
export const APPSHELL_HEADER_HEIGHT: number = 56;
export const APPSHELL_FOOTER_HEIGHT: number = 32;
export const APPSHELL_CONTAINER_SIZE: MantineSize = "xl";

/* Internal Endpoints */
export const URL_INTERNAL_RETROREWIND_ROOMS: string = "/api/retro-rewind/rooms";
export const URL_INTERNAL_RETROREWIND_VERSION: string = "/api/retro-rewind/version";
export const URL_INTERNAL_MII: string = "/api/mii";

/* External Endpoints */
export const URL_EXTERNAL_GITHUB_APP: string = "https://github.com/odysseusdev/retrorewind-status";
export const URL_EXTERNAL_RETROREWIND_ROOMS: string = "http://zplwii.xyz/api/groups";
export const URL_EXTERNAL_RETROREWIND_VERSION = "https://update.zplwii.xyz/RetroRewind/RetroRewindVersion.txt";
export const URL_EXTERNAL_MII_STUDIO: string = "https://qrcode.rc24.xyz/cgi-bin/studio.cgi";
export const URL_EXTERNAL_MII_IMAGE = "https://studio.mii.nintendo.com/miis/image.png";

/* React Query Keys */
export const QUERY_RETROREWIND_ROOMS: string = "retrorewind-rooms";
export const QUERY_RETROREWIND_VERSION: string = "retrorewind-version";
export const QUERY_MII: string = "mii";

/* Local Storage Keys */
export const LOCALSTORAGE_REFRESHINTERVAL: string = "settings-refresh-interval";
export const LOCALSTORAGE_RETROREWINDVERSION: string = "about-retrorewind-version";

/* Form Select Data */
