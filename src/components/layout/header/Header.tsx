import { APPSHELL_CONTAINER_SIZE, APPSHELL_HEADER_HEIGHT } from "@/lib/constants";
import { Box, Container, Group, Image, Text } from "@mantine/core";
import { HeaderMenu, HeaderRoomsRefresh } from ".";

import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";

dayjs.extend(relativetime);

const Header = () => {
	return (
		<Container
			size={APPSHELL_CONTAINER_SIZE}
			bg="transparent"
		>
			<Group
				h={APPSHELL_HEADER_HEIGHT}
				justify="space-between"
				align="center"
			>
				<Group gap="xs">
					<Image
						w={34}
						radius="xl"
						src="/favicon.svg"
						alt="Logo"
					/>
					<Box>
						<Text
							fw={700}
							lh={1.32}
						>
							Retro Rewind
						</Text>
						<Text
							fw={600}
							lh={1}
							size="xs"
							c="dimmed"
						>
							Players &amp; Rooms
						</Text>
					</Box>
				</Group>
				<Group gap={4}>
					<HeaderRoomsRefresh />
					<HeaderMenu />
				</Group>
			</Group>
		</Container>
	);
};

export default Header;
