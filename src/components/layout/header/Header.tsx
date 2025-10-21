import { APPSHELL_CONTAINER_SIZE, APPSHELL_HEADER_HEIGHT, BRAND_NAME, BRAND_SUBTITLE } from "@/lib/constants";
import { Box, Container, Group, Image, Text } from "@mantine/core";
import { HeaderMenu, HeaderRoomsRefresh } from ".";

import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";

dayjs.extend(relativetime);

// header component displaying brand and actions
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
					{/* logo */}
					<Image
						w={34}
						radius="xl"
						src="/favicon.ico" // using .ico as .svg was empty
						alt={`${BRAND_NAME} Logo`}
					/>
					{/* brand text */}
					<Box>
						<Text
							fw={700}
							lh={1.32}
						>
							{BRAND_NAME}
						</Text>
						<Text
							fw={600}
							lh={1}
							size="xs"
							c="dimmed"
						>
							{BRAND_SUBTITLE}
						</Text>
					</Box>
				</Group>
				{/* action icons */}
				<Group gap={4}>
					<HeaderRoomsRefresh />
					<HeaderMenu />
				</Group>
			</Group>
		</Container>
	);
};

export default Header;
