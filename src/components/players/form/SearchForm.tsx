import { Badge, Group, GroupProps, Text, TextInput } from "@mantine/core";

import { IconSearch } from "@tabler/icons-react";
import { useHotkeys } from "@mantine/hooks";
import { usePlayersFormContext } from "@/lib/contexts/PlayersFormContext";
import { useRef } from "react";

interface Props extends Omit<GroupProps, "children"> {}

const SearchForm = ({ ...props }: Props) => {
	const form = usePlayersFormContext();

	const ref = useRef<HTMLInputElement>(null);

	useHotkeys([["mod+K", () => ref.current?.focus(), { preventDefault: true }]]);

	return (
		<Group
			grow
			{...props}
		>
			<TextInput
				ref={ref}
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
				{...form.getInputProps("query")}
			/>
		</Group>
	);
};

export default SearchForm;
