import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";

import {
	APP_NAME, // import app name for iOS
	APPSHELL_CONTAINER_SIZE,
	APPSHELL_FOOTER_HEIGHT,
	APPSHELL_HEADER_HEIGHT,
	BRAND_NAME,
	BRAND_SUBTITLE
} from "@/lib/constants";
import {
	AppShell,
	AppShellFooter,
	AppShellHeader,
	AppShellMain,
	ColorSchemeScript,
	Container,
	MantineProvider,
} from "@mantine/core";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import type { Metadata, Viewport } from "next";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import React from "react";
import { RouterTransition } from "@/components/layout/RouterTransition";
import { theme } from "@/lib/theme";

// metadata for SEO and PWA/iOS
export const metadata: Metadata = {
	title: `${APP_NAME} · ${BRAND_SUBTITLE}`, // Use app name and subtitle
	description: `${BRAND_NAME} · ${BRAND_SUBTITLE}`,
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png", // ensure this file exists in /public
	},
	manifest: "/manifest.json", // ensure this file exists in /public
};

// viewport settings for responsiveness and PWA/iOS look
export const viewport: Viewport = {
	themeColor: "#00aeff", // main theme color for status bar etc.
	initialScale: 1,
	minimumScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: "cover", // use full screen on devices with notches
};

// root layout component
const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="de">
			<head>
				{/* pwa and ios specific meta tags */}
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/manifest.json" />

				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content={APP_NAME} />

				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider
					theme={theme}
					defaultColorScheme="light"
				>
					<RouterTransition />
					<Notifications
						mb={APPSHELL_FOOTER_HEIGHT}
						position="bottom-center"
						limit={1}
					/>
					<ModalsProvider
						labels={{ cancel: "Dismiss", confirm: "Confirm" }}
						modalProps={{
							overlayProps: {
								className: "blur",
							},
							centered: true,
							withCloseButton: false,
						}}
					>
						<AppShell
							header={{ height: APPSHELL_HEADER_HEIGHT }}
							footer={{ height: APPSHELL_FOOTER_HEIGHT }}
							padding={{ base: "xs", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
						>
							<AppShellHeader withBorder>
								<Header />
							</AppShellHeader>
							<AppShellMain>
								<Container
									py="xs"
									size={APPSHELL_CONTAINER_SIZE}
								>
									{children}
								</Container>
							</AppShellMain>
							<AppShellFooter>
								<Footer />
							</AppShellFooter>
						</AppShell>
					</ModalsProvider>
				</MantineProvider>
			</body>
		</html>
	);
};

export default RootLayout;

