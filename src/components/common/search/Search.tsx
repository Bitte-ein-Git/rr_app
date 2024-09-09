import { ActionIcon, TextInput, TextInputProps, ThemeIcon } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";

interface Props extends TextInputProps {
	query: string;
	setQuery: (value: string) => void;
}

const Search = ({ query, setQuery, ...props }: Props) => {
	return (
		<TextInput
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
				query.length > 0 && (
					<ActionIcon
						variant="transparent"
						size="md"
						color="gray"
						onClick={() => setQuery("")}
					>
						<IconX size={20} />
					</ActionIcon>
				)
			}
			{...props}
		/>
	);
};

export default Search;
