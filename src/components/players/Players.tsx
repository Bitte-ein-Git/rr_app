import { Badge, Text, TextInput } from "@mantine/core";

import { IconSearch } from "@tabler/icons-react";
import React from "react";

const Players = () => {
	return (
		<TextInput
			placeholder="Search"
			leftSection={<IconSearch size={16} />}
			rightSection={
				<Badge
					variant="light"
					radius="xs"
					color="gray"
				>
					<Text
						inherit
						tt="none"
					>
						Ctrl + K
					</Text>
				</Badge>
			}
			rightSectionWidth={70}
			rightSectionProps={{ style: { right: 8 } }}
			value=""
			onChange={() => null}
		/>
	);
};

export default Players;
