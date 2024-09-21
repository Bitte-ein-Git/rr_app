"use client";

import { ActionIcon, Group, GroupProps, TextInput, ThemeIcon } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";

import React from "react";
import { usePlayersFormContext } from "@/lib/contexts/PlayersFormContext";

interface Props extends Omit<GroupProps, "children"> {}

const SearchPlayersForm = ({ ...props }: Props) => {
	const form = usePlayersFormContext();

	return (
		<Group
			grow
			{...props}
		>
			<TextInput
				placeholder="Search.."
				leftSection={
					<ThemeIcon
						variant="transparent"
						size="md"
						color="gray"
					>
						<IconSearch size={20} />
					</ThemeIcon>
				}
				rightSection={
					form.getValues().query && (
						<ActionIcon
							variant="transparent"
							size="md"
							color="gray"
							onClick={() => form.setFieldValue("query", "")}
						>
							<IconX size={20} />
						</ActionIcon>
					)
				}
				{...form.getInputProps("query")}
			/>
		</Group>
	);
};

export default SearchPlayersForm;
