import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";

import { APPSHELL_CONTAINER_SIZE, APPSHELL_FOOTER_HEIGHT, APPSHELL_HEADER_HEIGHT } from "@/lib/constants";
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
import type { Metadata } from "next";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { RouterTransition } from "@/components/layout/RouterTransition";
import { theme } from "@/lib/theme";

export const metadata: Metadata = {
	title: "Retro Rewind · Players & Rooms",
	description: "Retro Rewind · Players & Rooms",
};

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en">
			<head>
				<link
					rel="icon"
					href="/favicon.ico"
					sizes="any"
				/>
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
