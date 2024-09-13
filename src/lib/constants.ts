import { MantineSize } from "@mantine/core";

/* Settings Defaults */
export const DEFAULT_SETTINGS_COLORSCHEME: "light" | "dark" = "light";
export const DEFAULT_SETTINGS_REFRESHINTERVAL: number = 120;
export const DEFAULT_SETTINGS_VRONLY: boolean = false;

/* Layout & Sizes */
export const APPSHELL_HEADER_HEIGHT: number = 56;
export const APPSHELL_FOOTER_HEIGHT: number = 32;
export const APPSHELL_CONTAINER_SIZE: MantineSize = "xl";

/* Internal Endpoints */
export const URL_INTERNAL_MII: string = "/api/mii";
export const URL_INTERNAL_RETROREWIND_ROOMS: string = "/api/retro-rewind/rooms";
export const URL_INTERNAL_RETROREWIND_VERSION: string = "/api/retro-rewind/version";
export const URL_INTERNAL_WHEELWIZARD_VERSION: string = "/api/wheel-wizard/version";

/* External Endpoints */
export const URL_EXTERNAL_GITHUB_APP: string = "https://github.com/odysseusdev/retrorewind-status";
export const URL_EXTERNAL_MII_IMAGE = "https://studio.mii.nintendo.com/miis/image.png";
export const URL_EXTERNAL_MII_STUDIO: string = "https://qrcode.rc24.xyz/cgi-bin/studio.cgi";
export const URL_EXTERNAL_RETROREWIND_ROOMS: string = "http://zplwii.xyz/api/groups";
export const URL_EXTERNAL_RETROREWIND_VERSION = "https://update.zplwii.xyz/RetroRewind/RetroRewindVersion.txt";
export const URL_EXTERNAL_WHEELWIZARD_VERSION = "https://api.github.com/repos/OWNER/REPO/releases/latest";

/* React Query Keys */
export const QUERY_MII: string = "mii";
export const QUERY_RETROREWIND_ROOMS: string = "retrorewind-rooms";
export const QUERY_RETROREWIND_VERSION: string = "retrorewind-version";
export const QUERY_WHEELWIZARD_VERSION: string = "wheelwizard-version";

/* Local Storage Keys */
export const LOCALSTORAGE_SETTINGS_REFRESHINTERVAL: string = "settings-refresh-interval";
export const LOCALSTORAGE_SETTINGS_VRONLY: string = "settings-vr-only";
export const LOCALSTORAGE_ABOUT_RETROREWINDVERSION: string = "about-retrorewind-version";
export const LOCALSTORAGE_ABOUT_WHEELWIZARDVERSION: string = "about-wheelwizard-version";

/* Form Select Data */
