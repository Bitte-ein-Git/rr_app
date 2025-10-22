import { MantineSize } from "@mantine/core";

// assumes worker is deployed at this root URL
const WORKER_BASE_URL = "https://api.heyfordy.de";

/* Settings Defaults */
export const DEFAULT_SETTINGS_COLORSCHEME: "light" | "dark" = "light";
export const DEFAULT_SETTINGS_REFRESHINTERVAL: number = 120; // refresh interval in seconds
export const DEFAULT_SETTINGS_VRONLY: boolean = false; // show only VR, not BR

/* Layout & Sizes */
export const APPSHELL_HEADER_HEIGHT: number = 56;
export const APPSHELL_FOOTER_HEIGHT: number = 32 + 64; // main footer + bottom nav
export const APPSHELL_CONTAINER_SIZE: MantineSize = "lg"; // max content width

/* Worker Endpoints */
// internal api routes are replaced by worker endpoints
export const URL_WORKER_APP_VERSION: string = `${WORKER_BASE_URL}/rr_app/version-app`; // Needs implementation in worker if required
export const URL_WORKER_MII: string = `${WORKER_BASE_URL}/rr_app/mii`; // Worker Mii endpoint
export const URL_WORKER_RETROREWIND_ROOMS: string = `${WORKER_BASE_URL}/rwfc`; // Worker rooms proxy (uses existing path)
export const URL_WORKER_RETROREWIND_VERSION: string = `${WORKER_BASE_URL}/rr_app/version-rr`; // Worker RR version endpoint
export const URL_WORKER_WHEELWIZARD_VERSION: string = `${WORKER_BASE_URL}/rr_app/version-ww`; // Worker WW version endpoint

/* External Endpoints (kept for reference or direct use if worker fails) */
export const URL_EXTERNAL_APP_REPOSITORY: string = "https://github.com/Bitte-ein-Git/rr_app"; // updated app repo
export const URL_EXTERNAL_APP_VERSION = "https://api.github.com/repos/Bitte-ein-Git/rr_app/releases/latest"; // GH API for app version
export const URL_EXTERNAL_MII_IMAGE = "https://studio.mii.nintendo.com/miis/image.png"; // Official Mii image source
export const URL_EXTERNAL_MII_STUDIO: string = "https://qrcode.rc24.xyz/cgi-bin/studio.cgi"; // Mii QR code generator
export const URL_EXTERNAL_RETROREWIND_ROOMS: string = "https://api.heyfordy.de/rwfc"; // Updated external rooms api source
export const URL_EXTERNAL_RETROREWIND_VERSION = "https://github.com/Bitte-ein-Git/rr_app/blob/source/versions.txt"; // Updated rr version source
export const URL_EXTERNAL_RETROREWIND_WIKI = "https://wiki.tockdom.com/wiki/Retro_Rewind"; // RR Wiki link
export const URL_EXTERNAL_WHEELWIZARD_REPOSITORY = "https://github.com/patchzyy/WheelWizard"; // WW Repo link
export const URL_EXTERNAL_WHEELWIZARD_VERSION = "https://api.github.com/repos/patchzyy/WheelWizard/releases/latest"; // GH API for WW version

/* Local Storage Keys */
export const LOCALSTORAGE_MIIS: string = "miis"; // key for cached mii images
export const LOCALSTORAGE_SETTINGS_REFRESHINTERVAL: string = "settings-refresh-interval"; // key for refresh interval setting
export const LOCALSTORAGE_SETTINGS_VRONLY: string = "settings-vr-only"; // key for VR only setting

/* Branding */
export const APP_NAME: string = "🏎️ RR•App"; // iOS web app name
export const BRAND_NAME: string = "🏎️ Retro Rewind"; // main brand name
export const BRAND_SUBTITLE: string = ""; // subtitle
export const BRAND_COPYRIGHT_HOLDER: string = "🍻 Bitte ein Git!"; // copyright holder
